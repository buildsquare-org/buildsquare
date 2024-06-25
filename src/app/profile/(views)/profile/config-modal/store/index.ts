import { create } from "zustand";

export const CONFIG_MODAL_SECTIONS = ["general", "links"] as const;
export type TConfigModalSection = (typeof CONFIG_MODAL_SECTIONS)[number];

type TConfigModalStore = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  currentSection: TConfigModalSection;
  setCurrentSection: (section: TConfigModalSection) => void;
};

export const useConfigModalStore = create<TConfigModalStore>((set, get) => ({
  isOpen: false,
  close: () => {
    set({ isOpen: false });
  },
  open: () => {
    set({ isOpen: true });
  },
  currentSection: "general",
  setCurrentSection: (section) => {
    set({ currentSection: section });
  },
}));
