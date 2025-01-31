import { CreateAdjustmentDto } from "@/types/adjustment/CreateAdjustmentDto";
import { ReadAdjustmentDto } from "@/types/adjustment/ReadAdjustmentDto";
import { UpdateAdjustmentDto } from "@/types/adjustment/UpdateAdjustmentDto";
import axios from "@/utils/axiosInstance";
import { create } from "zustand";

type AdjusmentStore = {
  adjustments: ReadAdjustmentDto[];
  selectedAdjustmentUpdate: ReadAdjustmentDto;
  currentPage: number;
  totalPages: number;
  selectedAdjustmentDetail: ReadAdjustmentDto;
  setSelectedAdjustmentUpdate: (adjustment: ReadAdjustmentDto) => void;
  fetchAdjustments: (page: number) => Promise<void>;
  getAdjustment: (id: number | string) => Promise<void>;
  createAdjustment: (adjustment: CreateAdjustmentDto) => Promise<void>;
  updateAdjustment: (adjustment: UpdateAdjustmentDto) => Promise<void>;
  deleteAdjustment: (id: number) => Promise<void>;
};

export const useAdjustmentStore = create<AdjusmentStore>((set, get) => ({
  adjustments: [],
  selectedAdjustmentUpdate: null,
  currentPage: 1,
  totalPages: 1,
  selectedAdjustmentDetail: null,
  setSelectedAdjustmentUpdate: (adjustment: ReadAdjustmentDto) => {
    set({ selectedAdjustmentUpdate: adjustment });
  },
  fetchAdjustments: async (page: number) => {
    try {
      const limit = 8;
      const response = await axios.get("/adjustments", {
        params: {
          limit,
          page,
        },
      });
      const { adjustments, totalPages } = response.data;
      set({
        adjustments,
        currentPage: page,
        totalPages,
      });
    } catch (e: any) {
      console.error("Failed to fetch adjustments:", e);
    }
  },
  getAdjustment: async (id) => {
    try {
      const response = await axios.get(`/adjustments/${id}`);
      set({
        selectedAdjustmentDetail: response.data,
      });
    } catch (e: any) {
      console.error("Failed to get product:", e);
    }
  },
  createAdjustment: async (adjustment) => {
    try {
      await axios.post("/adjustments", adjustment);
      await get().fetchAdjustments(get().currentPage);
    } catch (e: any) {
      console.error("Failed to create adjustment:", e);
    }
  },
  updateAdjustment: async (adjustment) => {
    try {
      await axios.post("/adjustments", adjustment);
      await get().fetchAdjustments(get().currentPage);
      const selectedAdjustmentDetail = get().selectedAdjustmentDetail;
      if (selectedAdjustmentDetail) {
        await get().getAdjustment(selectedAdjustmentDetail.id);
      }
    } catch (e: any) {
      console.error("Failed to update adjustment:", e);
    }
  },
  deleteAdjustment: async (id) => {
    try {
      await axios.delete(`/adjustments/${id}`);
      await get().fetchAdjustments(get().currentPage);
    } catch (e: any) {
      console.error("Failed to delete adjustment:", e);
    }
  },
}));
