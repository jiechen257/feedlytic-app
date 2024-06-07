import Url from 'url';

export const parseUrl = Url.parse;

export function isValidUrl(url: string) {
  const urlRegex =
    /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:\d{1,5})?(\/[^\s]*)?$/;
  return urlRegex.test(url);
}
