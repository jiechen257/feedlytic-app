import type { BoundStateCreator } from '@/hooks/useBoundStore';

export type SettingSlice = {
  filterOptions: {
    readStatus: number;
    hiddenStatus: number;
  };
  setFilterOptions: (options: any) => void;
};

export const createSettingSlice: BoundStateCreator<SettingSlice> = (
  set: any,
  get: any,
) => ({
  filterOptions: {
    readStatus: -1,
    hiddenStatus: -1,
    timeRange: null,
  },
  setFilterOptions: (options) => {
    const { readStatus, hiddenStatus, timeRange } = options;
    set({
      filterOptions: {
        readStatus,
        hiddenStatus,
        timeRange,
      },
    });
  },
});
