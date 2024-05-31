/* eslint-disable no-plusplus */
import { extractFromXml, FeedData } from '@extractus/feed-extractor';

export enum ActionStatus {
  Request,
  Success,
  Failure,
  Intermediate,
}

export const domParser = new DOMParser();

// eslint-disable-next-line no-useless-escape
const CHARSET_RE = /charset=([^()<>@,;:\"/[\]?.=\s]*)/i;
const XML_ENCODING_RE = /^<\?xml.+encoding="(.+?)".*?\?>/i;

export async function decodeFetchResponse(response: Response, isHTML = false) {
  const buffer = await response.arrayBuffer();
  let ctype =
    response.headers.has('content-type') &&
    response.headers.get('content-type');
  let charset =
    ctype && CHARSET_RE.test(ctype) ? CHARSET_RE.exec(ctype)?.[1] : undefined;
  let content = new TextDecoder(charset).decode(buffer);
  if (charset === undefined) {
    if (isHTML) {
      const dom = domParser.parseFromString(content, 'text/html');
      charset = dom
        .querySelector('meta[charset]')
        ?.getAttribute('charset')
        ?.toLowerCase();
      if (!charset) {
        ctype = dom
          .querySelector("meta[http-equiv='Content-Type']")
          ?.getAttribute('content') as any;
        charset = (ctype &&
          CHARSET_RE.test(ctype) &&
          CHARSET_RE.exec(ctype)?.[1].toLowerCase()) as any;
      }
    } else {
      charset = (XML_ENCODING_RE.test(content) &&
        XML_ENCODING_RE.exec(content)?.[1].toLowerCase()) as any;
    }
    if (charset && charset !== 'utf-8' && charset !== 'utf8') {
      content = new TextDecoder(charset).decode(buffer);
    }
  }
  return content;
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
