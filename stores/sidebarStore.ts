import { create } from "zustand";

type SidebarStore = {
  open: boolean;
  setSidebarOpen: (forceState?: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  setSidebarOpen: (forceState) => {
    set((state) => ({
      open: typeof forceState === "boolean" ? forceState : !state.open,
    }));
  },
}));
