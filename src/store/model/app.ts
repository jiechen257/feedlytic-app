import { BoundStateCreator } from '@/hooks/useBoundStore';

export type AppSlice = {
  locale: string;
  sourceInit: boolean;
};

export const createAppSlice: BoundStateCreator<AppSlice> = (set) => ({
  locale: 'zh',
  sourceInit: false,
  initSource: () => set({ sourceInit: true }),
});
