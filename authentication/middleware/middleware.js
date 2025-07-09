import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token avail" });

    try {
        const decoded = jwt.verify(token, process.env.jwt);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ Message: "Invalid token" });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(401).json({ message: "Admin only route" });
    next();
};

export { protect, admin };
