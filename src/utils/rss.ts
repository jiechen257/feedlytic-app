import { extractFromXml, FeedData } from '@extractus/feed-extractor';
import { parseUrl } from './url';

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
          const parsedUrl = parseUrl(url);
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
