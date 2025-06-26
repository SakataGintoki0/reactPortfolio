import { create } from 'zustand';

interface App {
  name: string;
  id: number;
}

type AppState = {
  selectedDir: string;
  setSelectedDir: (name: string) => void;
  removeSelectedDir: () => void;
  openedApps: App[];
  openApp: (name: string) => void;
  closeApp: (name: string) => void;
  activeApp: App | null;
  setActiveApp: (app: App) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedDir: '',
  openedApps: [],
  activeApp: null,
  setSelectedDir: (name: string) => set(() => ({ selectedDir: name })),
  removeSelectedDir: () => set(() => ({ selectedDir: '' })),
  openApp: (name: string) =>
    set((state) => {
      if (state.openedApps.length === 0) {
        return {
          openedApps: [...state.openedApps, { name, id: 0 }],
          activeApp: {
            name,
            id: 0,
          },
        };
      }

      if (state.openedApps.some((app: App) => app.name === name)) {
        return state; // Already opened, no need to do anything
      }

      return {
        openedApps: [
          ...state.openedApps,
          { name, id: state.openedApps[state.openedApps.length - 1].id + 1 },
        ],
        activeApp: {
          name,
          id: state.openedApps[state.openedApps.length - 1].id + 1,
        },
      };
    }),
  closeApp: (name: string) =>
    set((state) => ({
      openedApps: state.openedApps.filter((app) => app.name !== name),
    })),
  setActiveApp: (app: App) =>
    set((state) => {
      const currApps = state.openedApps;
      if (currApps[currApps.length - 1].name === app.name)
        return { activeApp: app };

      const newOpenedApps = rotateArray(state.openedApps, app.id);

      return { activeApp: app, openedApps: newOpenedApps };
    }),
}));

function rotateArray(arr: App[], pivotIndex: number) {
  if (pivotIndex < 0 || pivotIndex >= arr.length) {
    throw new Error('Pivot index out of bounds');
  }

  const result = [...arr];

  const pivotElement = result.splice(pivotIndex, 1)[0];

  result.push(pivotElement);

  return result.map((item, index) => ({
    ...item,
    id: index,
  }));
}
