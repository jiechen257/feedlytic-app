import { ActionStatus, parseRSS } from '@/utils/tool';
import { useBoundStore } from '@/hooks/useBoundStore';

const ESStore = window.electron.store;

export const enum SourceOpenTarget {
  Local,
  Webpage,
  External,
  FullContent,
}

export const enum SourceTextDirection {
  LTR,
  RTL,
  Vertical,
}

export class RSSSource {
  sid: number | undefined;

  url: string;

  iconurl?: string;

  name: string;

  openTarget: SourceOpenTarget;

  unreadCount: number | undefined;

  lastFetched: Date;

  serviceRef?: string;

  fetchFrequency: number; // in minutes

  textDir: SourceTextDirection;

  hidden: boolean;

  constructor(url: string, name: string = '') {
    this.url = url;
    this.name = name;
    this.openTarget = SourceOpenTarget.Local;
    this.lastFetched = new Date();
    this.fetchFrequency = 0;
    this.textDir = SourceTextDirection.LTR;
    this.hidden = false;
  }

  static async fetchMetaData(source: RSSSource) {
    const feed = await parseRSS(source.url);
    // if (feed && !source.name) {
    //   if (feed.title) source.name = feed.title.trim();
    //   source.name = source.name || '未命名';
    // }
    console.log('feed', feed);
    return feed;
  }
}

export type SourceState = {
  [sid: number]: RSSSource;
};

export const INIT_SOURCES = 'INIT_SOURCES';
export const ADD_SOURCE = 'ADD_SOURCE';
export const UPDATE_SOURCE = 'UPDATE_SOURCE';
export const UPDATE_UNREAD_COUNTS = 'UPDATE_UNREAD_COUNTS';
export const DELETE_SOURCE = 'DELETE_SOURCE';
export const HIDE_SOURCE = 'HIDE_SOURCE';
export const UNHIDE_SOURCE = 'UNHIDE_SOURCE';

interface InitSourcesAction {
  type: typeof INIT_SOURCES;
  status: ActionStatus;
  sources?: SourceState;
  err?: any;
}

interface AddSourceAction {
  type: typeof ADD_SOURCE;
  status: ActionStatus;
  batch: boolean;
  source?: RSSSource;
  err?: any;
}

interface UpdateSourceAction {
  type: typeof UPDATE_SOURCE;
  source: RSSSource;
}

interface UpdateUnreadCountsAction {
  type: typeof UPDATE_UNREAD_COUNTS;
  sources: SourceState;
}

interface DeleteSourceAction {
  type: typeof DELETE_SOURCE;
  source: RSSSource;
}

interface ToggleSourceHiddenAction {
  type: typeof HIDE_SOURCE | typeof UNHIDE_SOURCE;
  status: ActionStatus;
  source: RSSSource;
}

export type SourceActionTypes =
  | InitSourcesAction
  | AddSourceAction
  | UpdateSourceAction
  | UpdateUnreadCountsAction
  | DeleteSourceAction
  | ToggleSourceHiddenAction;
export function initSource() {
  return async (set: any) => {
    set({
      sourceInit: ActionStatus.Request,
    });
    if (!ESStore) return;
    set({
      sources: await ESStore.get('sources'),
    });
    set({
      sourceInit: ActionStatus.Success,
    });
  };
}

export function insertSource(source: RSSSource) {
  return new Promise((resolve, reject) => {
    const { sources } = useBoundStore.getState();
    const sids = Object.values(sources).map((s) => s.sid);
    source.sid = Math.max(...sids, -1) + 1;
    sources.push(source);
    try {
      ESStore.set('sources', sources);
      resolve(source);
    } catch (err) {
      reject(err);
    }
  });
}

export async function addSource(
  url: string,
  name: string,
  options: {
    sourceInit: boolean;
    setSourceInit: (val: boolean) => void;
  },
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sourceInit, setSourceInit } = options;
  if (!sourceInit) {
    throw new Error('Source not initialized');
  }
  const source = new RSSSource(url, name);
  const feed = await RSSSource.fetchMetaData(source);
  // source.unreadCount = feed.items.length;
  // const inserted = insertSource(source);
  // setSourceInit(true);
  // console.log('inserted', inserted);
}
