import jwt from "jsonwebtoken";
import { prisma } from "../config/db.config.js";
export const login = async (req, res) => {
    const body = req.body;
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
        const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).json({
            message: "Login successful",
            user: {
                ...user,
                token: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error logging in" });
    }
};
