import { prisma } from "./config/db.config.js";
import redis from "./config/redis.config.js";
const MESSAGE_BATCH_INTERVAL = 30000; // 30 seconds
const MESSAGE_STORAGE_PREFIX = "chat:messages:"; // Prefix for Redis keys to store messages
export async function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room. Connect to a valid ID"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}, Room: ${socket.room}`);
        socket.join(socket.room);
        socket.on("message", async (data) => {
            const roomKey = `${MESSAGE_STORAGE_PREFIX}${socket.room}`;
            try {
                // Push message to Redis list
                await redis.rpush(roomKey, JSON.stringify(data));
                // Optional: Set a TTL for the key
                await redis.expire(roomKey, 3600); // 1 hour TTL
            }
            catch (err) {
                console.error("Error saving message to Redis:", err);
            }
            // Broadcast the message to the room
            socket.to(socket.room).emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
    // Start the periodic batch insertion process
    startMessageBatchProcessor();
}
async function startMessageBatchProcessor() {
    const fetchAndDeleteScript = `
    local messages = redis.call('LRANGE', KEYS[1], 0, -1)
    redis.call('DEL', KEYS[1])
    return messages
  `;
    setInterval(async () => {
        try {
            const keys = await redis.keys(`${MESSAGE_STORAGE_PREFIX}*`);
            if (keys.length === 0)
                return;
            const pipeline = redis.pipeline();
            keys.forEach((key) => {
                pipeline.eval(fetchAndDeleteScript, 1, key);
            });
            const results = await pipeline.exec();
            const bulkInserts = [];
            results.forEach(([err, messages]) => {
                if (err) {
                    console.error("Error processing messages for a room:", err);
                    return;
                }
                const parsedMessages = messages.map((msg) => {
                    const parsedMessage = JSON.parse(msg);
                    // Transform to match Prisma.ChatsCreateManyInput
                    return {
                        group_id: parsedMessage.group_id, // Ensure group_id is included
                        name: parsedMessage.name, // Ensure name is included
                        message: parsedMessage.message ?? null, // Optional message field
                        created_at: parsedMessage.created_at ? new Date(parsedMessage.created_at) : undefined // Optional timestamp
                    };
                });
                bulkInserts.push(...parsedMessages);
            });
            if (bulkInserts.length > 0) {
                // Perform a single bulk insert
                await prisma.chats.createMany({ data: bulkInserts });
                console.log(`Bulk inserted ${bulkInserts.length} messages.`);
            }
        }
        catch (err) {
            console.error("Error in batch message processor:", err);
        }
    }, MESSAGE_BATCH_INTERVAL);
}
