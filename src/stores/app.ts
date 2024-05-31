import type { BoundStateCreator } from '@/hooks/useBoundStore';
import type { RSSSource } from './model/sourceModel';

export type AppSlice = {
  locale: string;
  sourceInit: boolean;
  sources: RSSSource[];
  setSourceInit: (newVal: boolean) => void;
  setSources: (newVal: RSSSource[]) => void;
};

export const createAppSlice: BoundStateCreator<AppSlice> = (set) => ({
  locale: 'zh',
  sourceInit: true,
  sources: [],
  setSourceInit: (newVal: boolean) => set({ sourceInit: newVal }),
  setSources: (newVal: RSSSource[]) => set({ sources: newVal }),
});
