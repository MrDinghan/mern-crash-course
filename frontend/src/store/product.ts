import { create } from "zustand";

import type { ProductDto, ProductResponseDto } from "@/api";
import { ProductService } from "@/api";

interface ProductStore {
  products: ProductResponseDto[];
  setProducts: (products: ProductResponseDto[]) => void;
  createProduct: (newProduct: ProductDto) => Promise<void>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (pid: string) => Promise<void>;
  updateProduct: (
    pid: string,
    updatedProduct: Partial<ProductDto>
  ) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    const createdProduct = await ProductService.createProduct(newProduct);
    set((state) => ({ products: [...state.products, createdProduct.data] }));
  },
  fetchProducts: async () => {
    const products = await ProductService.getProducts();
    set({ products: products.data });
  },
  deleteProduct: async (pid) => {
    await ProductService.deleteProduct(pid);
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
  },
  updateProduct: async (pid, updatedProduct) => {
    const { data } = await ProductService.updateProduct(pid, updatedProduct);
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data : product
      ),
    }));
  },
}));
