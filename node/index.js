import express, { json } from "express";
import mysql2 from 'mysql2';


const app = express();

const db = mysql2.createConnection({
    user: 'root',
    password: "",
    database: "test",
})

app.get("/pizza", (req, res) => {

    const q = "SELECT * FROM food";
    db.query(q, (err, data) => {
        if (err) return err
        return res.json(data)
    })
})


app.post("/pizza", (req, res) => {

    const q = "INSERT INTO food (`food`, `price`, `image`) VALUES (?,?,?)";
    const value = [
        req.body.food,
        req.body.price,
        req.body.image
    ]

    db.query(q, value, (err, data) => {
        if (err) return err;
        return res.json("Addedd Successfully");
    })

})

app.use("test/", (req, res, next) => {
    res.send(`Request Method : ${req.method}, URL: ${req.url}`);
    next();
});

// app.use((req, res, next) => {
//     console.log("middleware setted");
//     next();
// })
// app.use((req, res, next) => {
//     console.log("second middleware");
// })

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
