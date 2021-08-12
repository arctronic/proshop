import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrderByID,
  getUserOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();
router.route("/myorders").get(protect, getUserOrder);
router.route("/").post(protect, addOrderItems).get(protect,isAdmin,getAllOrders)
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);
export default router;
