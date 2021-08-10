import express from "express";
import {
  addOrderItems,
  getOrderByID,
  getUserOrder,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();
router.route("/myorders").get(protect, getUserOrder);
router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
