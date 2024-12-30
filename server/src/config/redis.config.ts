import { Redis } from "ioredis";

// Create a Redis client for general use
const redis = new Redis({
  host: "localhost",
  port: 6379,
  retryStrategy(times) {
    return Math.min(times * 50, 2000); // Reconnection strategy
  }
});

export default redis;
