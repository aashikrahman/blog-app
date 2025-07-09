import express from 'express'
import cors from 'cors';
import userReg from './routes/authRouter.js'
import createBlog from './routes/blogRoutes.js'


const app = express();


app.use(express.json())
app.use(cors())


//test api end point


app.get('/api/test', (req, res) => {
    res.send("Hellow")
})

// main end points

app.use('/api/auth', userReg)
app.use('/api/blog', createBlog)

export default app