import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.config.js";
import asyncHandler from "express-async-handler";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

export const login = async (req: Request, res: Response) => {
  const body: LoginPayloadType = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: body,
      });

      if (!user) {
        return res.status(500).json({ message: "Error creating user" });
      }
    }

    let JWTPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        ...user,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in" });
  }
};
