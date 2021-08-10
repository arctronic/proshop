import express from 'express'
import {authUser,getUserProfile,getUsers,regesterUser, updateUserProfile} from '../controllers/userController.js'
import { isAdmin, protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.route('/').post(regesterUser).get(protect,isAdmin,getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
export default router