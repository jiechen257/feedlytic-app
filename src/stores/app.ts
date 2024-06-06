import type { BoundStateCreator } from '@/hooks/useBoundStore';
import { addSourceHelper, type RSSSource } from './model/source';
import { addMenuItemHelper, Menu } from './model/menu';
import {
  getStoreMenu,
  getStoreSource,
  setStoreMenu,
  setStoreSource,
} from './electron-store';

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
  initAppStore: () => void;
  addSource: (url: string, name: string) => void;
  clearAllData: () => void;
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
  currentMenuKey: '',
  originMenu: [],
  originSources: [],
  menu: [],
  sources: [],
  initAppStore: async () => {
    const menu = getStoreMenu();
    const sources = getStoreSource();
    set({
      sourceInit: true,
      feedInt: false,
      fetchStatus: {
        fetching: false,
        fetchingProgress: 0,
        fetchingTotal: 0,
      },
      lastFetched: new Date(),
      // originMenu: menu,
      // originSources: sources,
      menu,
      sources,
    });
    console.log('init-app-store', get().sources, get().menu);
  },
  addSource: async (url: string, name: string) => {
    await addSourceHelper({ set, get }, url, name);
    await addMenuItemHelper(
      { set, get },
      get().sources[get().sources.length - 1],
      '',
    );
  },
  clearAllData: async () => {
    set({
      menu: [],
      sources: [],
    });
    setStoreMenu([]);
    setStoreSource([]);
  },
  getSource: (url: string): RSSSource => {
    return get().sources.find((s) => s.url === url);
  },
  addMenu: (source: RSSSource, group: string) => {
    addMenuItemHelper({ set, get }, source, group);
  },
  setCurrentMenuKey: (key: string) => {
    set({ currentMenuKey: key });
  },
});
