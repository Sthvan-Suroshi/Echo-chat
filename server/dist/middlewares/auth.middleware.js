import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    //verifying the token
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                return res.status(403).json({ message: "Forbidden" });
            req.user = user;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
