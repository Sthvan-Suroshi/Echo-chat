import { Request, Response } from "express";
import { prisma } from "../config/db.config.js";

interface GroupUserType {
  name: string;
  group_id: string;
}

export const index = async (req: Request, res: Response) => {
  try {
    const { group_id } = req.query;

    const users = await prisma.groupUsers.findMany({
      where: {
        group_id: group_id as string
      }
    });

    return res.json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching the group!. Please try again" });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const body: GroupUserType = req.body;

    const user = await prisma.groupUsers.create({
      data: body
    });

    return res.json({ message: "User added successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching the group!. Please try again" });
  }
};
