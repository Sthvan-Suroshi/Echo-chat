import { Request, Response } from "express";
import { prisma } from "../config/db.config.js";

export const index = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    // apply pagination or inifinte scroll
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId
      }
    });

    return res.json({ data: chats });
  } catch (error) {
    console.log(error);
  }
};
