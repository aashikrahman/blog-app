import express from 'express';
import { register, login } from '../controller/authController.js';



const route = express.Router();

route.use('/register', register);
route.use('/login', login);


export default route;