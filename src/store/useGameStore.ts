import { create } from 'zustand';
import type { WorldId } from "../types/novel";

export type ScreenState = 'loading' | 'menu' | 'playing';

interface GameState {
  currentScreen: ScreenState;
  currentWorld: WorldId;
  setScreen: (screen: ScreenState) => void;
  setWorld: (world: WorldId) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'loading',
  currentWorld: 'ship',
  setScreen: (screen) => set({ currentScreen: screen }),
  setWorld: (world) => set({ currentWorld: world }),
}));