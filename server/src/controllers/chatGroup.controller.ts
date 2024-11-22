import { Request, Response } from "express";
import { prisma } from "../config/db.config.js";

// creating a new chat group
export const store = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = req.user;

    await prisma.chatGroup.create({
      data: { title: body.title, password: body.password, user_id: user.id }
    });

    return res.json({ message: "Group created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating group" });
  }
};

//getting user's chat groups
export const index = async (req: Request, res: Response) => {
  try {
    const groups = await prisma.chatGroup.findMany({
      where: { user_id: req.user?.id },
      orderBy: { created_at: "desc" }
    });

    return res.json({ message: "Groups fetched successfully", data: groups });
  } catch (error) {
    return res.status(500).json({ message: "Error creating group" });
  }
};

//show a single chat group
export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const group = await prisma.chatGroup.findUnique({
      where: { id: id }
    });

    return res.json({ message: "Group fetched successfully", data: group });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching the group" });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedGroup = await prisma.chatGroup.update({
      where: { id: id },
      data: {
        title: req.body.title,
        password: req.body.password
      }
    });

    return res.json({ message: "Group updated successfully", data: updatedGroup });
  } catch (error) {
    return res.status(500).json({ message: "Error updating the group" });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedGroup = await prisma.chatGroup.delete({
      where: { id: id }
    });

    return res.json({ message: "Group deleted successfully", data: deletedGroup });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting the group" });
  }
};
