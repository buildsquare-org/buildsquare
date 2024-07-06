"use client";

import { create } from "zustand";

type TNewProjectDrawerSheetStore = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export const useNewProjectDrawerSheetStore =
  create<TNewProjectDrawerSheetStore>((set, get) => ({
    visible: true,
    setVisible: (value) => {
      set({ visible: value });
    },
  }));
