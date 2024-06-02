/* eslint-disable no-plusplus */
import { extractFromXml, FeedData } from '@extractus/feed-extractor';
import Url from 'url';

export enum ActionStatus {
  Request,
  Success,
  Failure,
  Intermediate,
}
export const domParser = new DOMParser();

export async function validateFavicon(url: string) {
  let flag = false;
  try {
    const result = await fetch(url, { credentials: 'omit' });
    if (
      result.status === 200 &&
      result.headers.has('Content-Type') &&
      result.headers.get('Content-Type')?.startsWith('image')
    ) {
      flag = true;
    }
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return flag;
  }
}

export async function fetchFavicon(url: string) {
  try {
    // eslint-disable-next-line no-param-reassign
    url = url.split('/').slice(0, 3).join('/');
    const result = await fetch(url, { credentials: 'omit' });
    if (result.ok) {
      const html = await result.text();
      const dom = domParser.parseFromString(html, 'text/html');
      const links = dom.getElementsByTagName('link');
      // eslint-disable-next-line no-restricted-syntax
      for (const link of links) {
        const rel = link.getAttribute('rel');
        if (
          (rel === 'icon' || rel === 'shortcut icon') &&
          link.hasAttribute('href')
        ) {
          const href = link.getAttribute('href');
          const parsedUrl = Url.parse(url);
          if (href?.startsWith('//')) return parsedUrl.protocol + href;
          if (href?.startsWith('/')) return url + href;
          return href;
        }
      }
    }
    // eslint-disable-next-line no-param-reassign
    url += '/favicon.ico';
    if (await validateFavicon(url)) {
      return url;
    }
    return null;
  } catch {
    return null;
  }
}

export async function parseRSS(url: string) {
  let result: Response;
  try {
    result = await fetch(url);
  } catch {
    throw new Error('Network error');
  }
  if (result) {
    const xml = await result.text();

    const feed: FeedData = extractFromXml(xml);
    return feed;
  }
  throw new Error('Parse error');
}

export function htmlDecode(input: string) {
  const doc = domParser.parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}

export const urlTest = (s: string) =>
  // eslint-disable-next-line no-useless-escape
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi.test(
    s,
  );

export const getWindowBreakpoint = () => window.outerWidth >= 1440;

export const cutText = (s: string, length: number) => {
  return s.length <= length ? s : `${s.slice(0, length)}…`;
};

export function byteToMB(B: number) {
  const MB = Math.round(B / 1048576);
  return `${MB}MB`;
}

function byteLength(str: string) {
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; // trail surrogate
  }
  return s;
}

export function calculateItemSize(): Promise<number> {
  return new Promise((resolve, reject) => {
    let result = 0;
    const openRequest = window.indexedDB.open('itemsDB');
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const objectStore = db.transaction('items').objectStore('items');
      const cursorRequest = objectStore.openCursor();
      cursorRequest.onsuccess = () => {
        const cursor = cursorRequest.result;
        if (cursor) {
          result += byteLength(JSON.stringify(cursor.value));
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      cursorRequest.onerror = () => reject();
    };
    openRequest.onerror = () => reject();
  });
}
