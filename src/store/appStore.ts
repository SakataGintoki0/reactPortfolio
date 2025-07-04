import { create } from 'zustand';

interface App {
  name: string;
  id: number;
  zIndex: number;
  position: { x: number; y: number }; // Add position tracking
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
  maxZIndex: number;
  updateAppPosition: (
    appId: number,
    position: { x: number; y: number }
  ) => void;
};

const DEFAULT_POSITION = { x: 100, y: 100 };
const CASCADE_OFFSET = 30; // Pixels to offset each new window

export const useAppStore = create<AppState>((set) => ({
  selectedDir: '',
  openedApps: [],
  activeApp: null,
  maxZIndex: 20,

  setSelectedDir: (name: string) => set(() => ({ selectedDir: name })),
  removeSelectedDir: () => set(() => ({ selectedDir: '' })),

  openApp: (name: string) =>
    set((state) => {
      if (state.openedApps.some((app: App) => app.name === name)) {
        // App already exists, just make it active and bring to front
        const existingApp = state.openedApps.find(
          (app: App) => app.name === name
        )!;
        const newZIndex = state.maxZIndex + 1;
        return {
          openedApps: state.openedApps.map((app) =>
            app.name === name ? { ...app, zIndex: newZIndex } : app
          ),
          activeApp: { ...existingApp, zIndex: newZIndex },
          maxZIndex: newZIndex,
        };
      }

      const newId =
        state.openedApps.length > 0
          ? Math.max(...state.openedApps.map((app) => app.id)) + 1
          : 0;
      const newZIndex = state.maxZIndex + 1;

      // Calculate new position based on active app or default
      let newPosition;
      if (state.activeApp) {
        // Cascade from the active app position
        newPosition = {
          x: state.activeApp.position.x + CASCADE_OFFSET,
          y: state.activeApp.position.y + CASCADE_OFFSET,
        };

        // Wrap around if we go too far right/down (basic bounds checking)
        if (newPosition.x > 400) newPosition.x = DEFAULT_POSITION.x;
        if (newPosition.y > 300) newPosition.y = DEFAULT_POSITION.y;
      } else {
        // No active app, use default position
        newPosition = DEFAULT_POSITION;
      }

      const newApp = {
        name,
        id: newId,
        zIndex: newZIndex,
        position: newPosition,
      };

      return {
        openedApps: [...state.openedApps, newApp],
        activeApp: newApp,
        maxZIndex: newZIndex,
      };
    }),

  closeApp: (name: string) =>
    set((state) => {
      const remainingApps = state.openedApps.filter((app) => app.name !== name);
      return {
        openedApps: remainingApps,
        activeApp: state.activeApp?.name === name ? null : state.activeApp,
      };
    }),

  setActiveApp: (app: App) =>
    set((state) => {
      // If it's already the active app, don't do anything
      if (state.activeApp && state.activeApp.id === app.id) {
        return state;
      }

      // Just update the z-index without changing IDs
      const newZIndex = state.maxZIndex + 1;

      return {
        openedApps: state.openedApps.map((a) =>
          a.id === app.id ? { ...a, zIndex: newZIndex } : a
        ),
        activeApp: { ...app, zIndex: newZIndex },
        maxZIndex: newZIndex,
      };
    }),

  updateAppPosition: (appId: number, position: { x: number; y: number }) =>
    set((state) => ({
      openedApps: state.openedApps.map((app) =>
        app.id === appId ? { ...app, position } : app
      ),
      activeApp:
        state.activeApp?.id === appId
          ? { ...state.activeApp, position }
          : state.activeApp,
    })),
}));
