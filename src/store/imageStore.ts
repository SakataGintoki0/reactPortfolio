import { create } from 'zustand';

type AppState = {
  activeImageIndex: number;
  allImages: string[];
  setActiveImage: (image: number) => void;
  setAllImages: (images: string[]) => void;
};

export const useImageStore = create<AppState>((set) => ({
  activeImageIndex: -1,
  allImages: [],
  setActiveImage: (image: number) => set(() => ({ activeImageIndex: image })),
  setAllImages: (images: string[]) => set(() => ({ allImages: images })),
}));
