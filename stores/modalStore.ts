import { create } from "zustand";
type ModalType = "product" | "adjustment";

type ModalStore = {
  open: boolean;
  setModalOpen: (modalType?: ModalType) => void;
  modalType: ModalType;
};

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  setModalOpen: (modalType) => {
    if (modalType) {
      set({ modalType });
    }
    set((state) => ({
      open: !state.open,
    }));
  },
  modalType: "product",
}));
