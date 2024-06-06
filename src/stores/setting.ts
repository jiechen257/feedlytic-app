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
  },
  setFilterOptions: (options) => {
    const { readStatus, hiddenStatus } = options;
    set({
      filterOptions: {
        readStatus,
        hiddenStatus,
      },
    });
    console.log('setFilterOptions', get().filterOptions);
  },
});
