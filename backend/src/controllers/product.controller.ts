import mongoose from "mongoose";
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";

import { ProductDto } from "@/models/product.dto";
import Product from "@/models/product.model";
import {
  ProductResponseDto,
  productTransformer,
} from "@/models/product.response.dto";
import { ApiResponse } from "@/types/ApiResponse";

import { BaseController } from "./base-controller";

@Route("products")
@Tags("Product")
export class ProductController extends BaseController {
  @Get()
  public async getProducts(): Promise<ApiResponse<ProductResponseDto[]>> {
    const products = await Product.find({});
    return this.successWithTransformMany(products, productTransformer);
  }

  @Post()
  public async createProduct(
    @Body() productData: ProductDto
  ): Promise<ApiResponse<ProductResponseDto>> {
    if (!productData.name || !productData.price || !productData.image) {
      return this.fail("Invalid product data");
    }
    const product = new Product(productData);
    await product.save();
    return this.successWithTransformOne(product, productTransformer);
  }

  @Delete("{id}")
  public async deleteProduct(
    @Path() id: string
  ): Promise<ApiResponse<{ message: string }>> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.fail("Invalid product ID");
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return this.fail("Product not found");
    }
    return this.success({ message: "Product deleted" });
  }

  @Put("{id}")
  public async updateProduct(
    @Path() id: string,
    @Body() updates: Partial<ProductDto>
  ): Promise<ApiResponse<ProductResponseDto>> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return this.fail("Invalid product ID");
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return this.fail("Product not found");
    }
    return this.successWithTransformOne(updatedProduct, productTransformer);
  }
}
