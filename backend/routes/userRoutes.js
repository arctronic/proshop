import express from 'express'
import {authUser,getUserProfile,regesterUser, updateUserProfile} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.route('/').post(regesterUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
export default router