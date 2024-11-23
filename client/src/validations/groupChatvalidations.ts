import { z } from "zod";

export const createGroupChatSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "Title must be at least 4 characters" })
      .max(191, { message: "Title must be at most 191 characters" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(25, { message: "Password must be at most 191 characters" }),
  })
  .required();

export type createGroupChatSchemaType = z.infer<typeof createGroupChatSchema>;
