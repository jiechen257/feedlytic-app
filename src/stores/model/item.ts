// @ts-ignore
import type { FeedEntry } from '@extractus/feed-extractor';

export class RSSItem {
  // _id: number;

  source: number;

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

  constructor(item: FeedEntry, source: RSSSource) {
    for (const field of ['title', 'link', 'creator']) {
      const content = item[field];
      if (content && typeof content !== 'string') delete item[field];
    }
    this.source = source.sid;
    this.title = item.title || '未命名';
    this.link = item.link || '';
    this.fetchedDate = new Date();
    this.date = new Date(item.isoDate ?? item.pubDate ?? this.fetchedDate);
    this.hasRead = false;
    this.starred = false;
    this.hidden = false;
  }
}

export const a = 1;
