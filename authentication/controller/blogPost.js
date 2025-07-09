import db from "../config/db.js";

const blogRoute = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;

    try {
        const insertData = "INSERT INTO blogs (title, content ,user_id ) VALUES (?,?,?)";

        await db.promise().query(insertData, [title, content, userId]);

        return res.status(200).json({ message: "Blog created" });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "server error" });
    }
};

export default blogRoute;
