import type { BoundStateCreator } from '@/hooks/useBoundStore';
import { addSourceHelper, type RSSSource } from './model/source';
import { addMenuItemHelper, Menu } from './model/menu';
import ESStore from './electron-store';

export type AppSlice = {
  sourceInit: boolean;
  feedInt: boolean;
  fetchStatus: {
    fetching: boolean;
    fetchingProgress: number;
    fetchingTotal: number;
  };
  lastFetched: Date;
  menu: Menu[];
  sources: RSSSource[];
  initApp: () => void;
  addSource: (url: string, name: string) => void;
};

export const createAppSlice: BoundStateCreator<AppSlice> = (
  set: any,
  get: any,
) => ({
  sourceInit: true,
  feedInt: false,
  fetchStatus: {
    fetching: false,
    fetchingProgress: 0,
    fetchingTotal: 0,
  },
  lastFetched: new Date(),
  menu: [],
  sources: [],
  initApp: async () => {
    const menu = await ESStore().get('app.menu');
    const sources = await ESStore().get('app.sources');
    set({
      sourceInit: true,
      feedInt: false,
      fetchStatus: {
        fetching: false,
        fetchingProgress: 0,
        fetchingTotal: 0,
      },
      lastFetched: new Date(),
      menu,
      sources,
    });
  },
  addSource: async (url: string, name: string) => {
    await addSourceHelper({ set, get }, url, name);
    await addMenuItemHelper(
      { set, get },
      get().sources[get().sources.length - 1],
      '',
    );
  },
  addMenu: async (source: RSSSource, group: string) => {
    addMenuItemHelper({ set, get }, source, group);
  },
});
