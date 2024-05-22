import { create } from 'zustand';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  setBears: (bears: number) => set({ bears }),
}));

type State = {
  firstName: string;
  lastName: string;
};

type Action = {
  updateFirstName: (firstName: State['firstName']) => void;
  updateLastName: (lastName: State['lastName']) => void;
};

// Create your store, which includes both state and (optionally) actions
const useStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName })),
  updateLastName: (lastName) => set(() => ({ lastName })),
}));

export { useBearStore, useStore };
