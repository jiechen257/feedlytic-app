// @ts-ignore
import { isArticleWithinTimeRange } from '@/utils/date';
import type { FeedEntry } from '@extractus/feed-extractor';

export class RSSItem {
  id: string;

  title: string;

  link: string;

  date: Date;

  fetchedDate: Date;

  thumb?: string;

  // content: string;

  // snippet: string;

  creator?: string;

  readStatus: number;

  starred: boolean;

  hiddenStatus: number;

  constructor(item: FeedEntry) {
    this.id = item.id;
    this.title = item.title || '未命名';
    this.link = item.link || '';
    this.fetchedDate = new Date();
    this.date = new Date(item?.published);
    this.readStatus = -1;
    this.starred = false;
    this.hiddenStatus = -1;
  }
}

export function filterSourcesItems(items: RSSItem[], filter: any) {
  return items?.filter((v: RSSItem) => {
    return Object.keys(filter).every((key) => {
      switch (key) {
        case 'readStatus':
          return filter.readStatus === v.readStatus;
        case 'hiddenStatus':
          return filter.hiddenStatus === v.hiddenStatus;

        case 'timeRange':
          if (!filter.timeRange) {
            return true;
          }
          // deter
          return isArticleWithinTimeRange(v.date, filter.timeRange);
        default:
          return true;
      }
    });
  });
}
