import { create } from "zustand";

import type { ProductDto } from "@/api";
import { ProductService } from "@/api";

interface ProductStore {
  products: ProductDto[];
  setProducts: (products: ProductDto[]) => void;
  createProduct: (newProduct: ProductDto) => Promise<void>;
  getProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [] as ProductDto[],
  setProducts: (products: ProductDto[]) => set({ products }),
  createProduct: async (newProduct: ProductDto) => {
    const createdProduct = await ProductService.createProduct(newProduct);
    set((state) => ({ products: [...state.products, createdProduct.data] }));
  },
  getProducts: async () => {
    const products = await ProductService.getProducts();
    set({ products: products.data });
  },
}));
