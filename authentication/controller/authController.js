import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !password || !email)
        return res.status(404).json({ message: "Credential Required" });

    try {
        const checkQuery = "SELECT * FROM users WHERE email= ?";
        const [result] = await db.promise().query(checkQuery, [email]);

        if (result.length > 0)
            return res.status(404).json({ message: " user already exist" });

        //Insert data to db

        const insertData =
            "INSERT INTO users(name, email, password) VALUES (?,?,?)";

        const hashPassword = await bcrypt.hash(password, 10);

        await db.promise().query(insertData, [name, email, hashPassword]);

        res.status(200).json({ message: "User added Successfully" });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "server error" }, err);
    }
};

// login

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkQuery = "SELECT * FROM users WHERE email = ?";

        const [result] = await db.promise().query(checkQuery, [email, password]);

        if (result.length === 0) {
            return res.status(401).json({ message: "Email is not matched" });
        }

        const user = result[0];

        const decodedd = await bcrypt.compare(password, user.password);

        if (!decodedd) {
            return res.status(401).json({ message: " Password incorrect" });
        }

        const token = jwt.sign(
            { userId: user.id, user: user.name, role: user.role },
            process.env.JWT,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            token,
            user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "server error" }, err);
    }
    console.error("🛬 Incoming POST request:", req.body);
};

export { register, login };
