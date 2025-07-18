import { create } from 'zustand';

type AppState = {
  bg: number;
  selectedBg: number;
  setBg: (bg: number) => void;
  setSelectedBg: (bg: number) => void;
};

export const useAppearancesStore = create<AppState>((set) => ({
  bg: 0,
  selectedBg: -1,
  setBg: (bg: number) => set(() => ({ bg })),
  setSelectedBg: (bg: number) => set(() => ({ selectedBg: bg })),
}));
