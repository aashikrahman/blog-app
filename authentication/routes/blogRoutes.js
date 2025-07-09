import express from 'express'
import blogRoute from '../controller/blogPost.js';
import { admin, protect } from '../middleware/middleware.js';

const route = express.Router();


route.use('/create', protect, blogRoute);



export default route;