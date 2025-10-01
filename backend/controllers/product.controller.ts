import mongoose from "mongoose";
import type { Request, Response } from "express";
import Product from "../models/product.model.ts";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product data" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id = "" } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error: any) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
