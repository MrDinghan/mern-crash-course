import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.ts";

const router = express.Router();

router.get("/", getProducts);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
