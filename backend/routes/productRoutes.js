import express from "express";
import {
  getProductByID,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middleware/authMiddleWare.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductByID)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
