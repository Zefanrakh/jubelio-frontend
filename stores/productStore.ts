import { CreateProductDto } from "@/types/product/CreateProductDto";
import { ReadProductDto } from "@/types/product/ReadProductDto";
import { UpdateProductDto } from "@/types/product/UpdateProductDto";
import axios from "@/utils/axiosInstance";
import { create } from "zustand";

type ProductStore = {
  products: ReadProductDto[];
  allProducts: ReadProductDto[];
  selectedProductUpdate: ReadProductDto;
  currentPage: number;
  hasMore: boolean;
  selectedProductDetail: ReadProductDto;
  isLoading: boolean;
  setSelectedProductUpdate: (product: ReadProductDto) => void;
  fetchProducts: (refetchOnly?: boolean) => Promise<void>;
  fetchProductsNoPagination: () => Promise<void>;
  getProduct: (id: number | string) => Promise<void>;
  createProduct: (product: CreateProductDto) => Promise<void>;
  updateProduct: (product: UpdateProductDto) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  allProducts: [],
  selectedProductUpdate: null,
  currentPage: 0,
  hasMore: false,
  selectedProductDetail: null,
  isLoading: false,
  setSelectedProductUpdate: (product: ReadProductDto) => {
    set({ selectedProductUpdate: product });
  },
  fetchProducts: async (refetchOnly) => {
    try {
      set({ isLoading: true });
      const limit = 8;
      const currentPage = get().currentPage;
      const response = await axios.get("/products", {
        params: {
          limit: refetchOnly ? limit * currentPage : limit,
          page: refetchOnly ? 1 : currentPage + 1,
        },
      });
      const { products } = response.data;
      set({ hasMore: !!products.length });
      set({
        products: [
          ...(refetchOnly ? [] : get().products.slice(0, currentPage * limit)),
          ...products,
        ],
        currentPage: refetchOnly ? currentPage : currentPage + 1,
      });
    } catch (e: any) {
      console.error("Failed to fetch products:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProductsNoPagination: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/products");
      const { products } = response.data;
      set({ hasMore: !!products.length });
      set({
        allProducts: products,
      });
    } catch (e: any) {
      console.error("Failed to fetch products:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  getProduct: async (id) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`/products/${id}`);
      set({
        selectedProductDetail: response.data,
      });
    } catch (e: any) {
      console.error("Failed to get product:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  createProduct: async (product) => {
    try {
      set({ isLoading: true });
      await axios.post("/products", product);
      await get().fetchProducts(true);
    } catch (e: any) {
      console.error("Failed to create product:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  updateProduct: async (product) => {
    try {
      set({ isLoading: true });
      await axios.post("/products", product);
      await get().fetchProducts(true);
      const selectedProductDetail = get().selectedProductDetail;
      if (selectedProductDetail) {
        await get().getProduct(selectedProductDetail.id);
      }
    } catch (e: any) {
      console.error("Failed to update product:", e);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProduct: async (id) => {
    try {
      set({ isLoading: true });
      await axios.delete(`/products/${id}`);
      await get().fetchProducts(true);
    } catch (e: any) {
      console.error("Failed to delete product:", e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
