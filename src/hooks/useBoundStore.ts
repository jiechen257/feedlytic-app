import { create, StateCreator } from 'zustand';
import { createAppSlice } from '@/stores/app';
import type { AppSlice } from '@/stores/app';

type BoundState = AppSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createAppSlice(...args),
}));
