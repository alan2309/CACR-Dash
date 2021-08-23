import express from 'express';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import {
    authUser,
    registerUser,
    getUsers,
  } from '../controllers/userController.js'
import {errorHandler} from "../middleware/errorMiddleware.js"
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers)//remove protect to test api without authorization
router.post('/login', authUser,errorHandler )

export default router;