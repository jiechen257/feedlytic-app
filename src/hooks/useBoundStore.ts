import { create, StateCreator } from 'zustand';
import { createAppSlice } from '@/stores/app';
import type { AppSlice } from '@/stores/app';
import { createSettingSlice, type SettingSlice } from '@/stores/setting';

type BoundState = AppSlice | SettingSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createAppSlice(...args),
  ...createSettingSlice(...args),
}));
