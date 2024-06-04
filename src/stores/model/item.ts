// @ts-ignore
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

  hasRead: boolean;

  starred: boolean;

  hidden: boolean;

  constructor(item: FeedEntry) {
    this.id = item.id;
    this.title = item.title || '未命名';
    this.link = item.link || '';
    this.fetchedDate = new Date();
    this.date = new Date(item?.published);
    this.hasRead = false;
    this.starred = false;
    this.hidden = false;
  }
}

export const a = 1;
