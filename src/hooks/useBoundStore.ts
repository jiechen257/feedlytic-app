import { StateCreator } from 'zustand';
import { createAppSlice } from '@/store/model/app';
import type { AppSlice } from '@/store/model/app';

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
