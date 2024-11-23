import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
    log: ["query", "error"], // mentioning query and error logs, shows how data is being quered
    errorFormat: "pretty"
});
