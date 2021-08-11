import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  regesterUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { isAdmin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.route("/").post(regesterUser).get(protect, isAdmin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);
export default router;
