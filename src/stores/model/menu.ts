import { setStoreMenu } from '../electron-store';
import { RSSSource } from './source';

export class Menu {
  group: string;

  key: string;

  label: string;

  logo: string;

  constructor(source: RSSSource, group: string) {
    this.group = group || '';
    this.key = source.url;
    this.label = source.name;
    this.logo = source.iconUrl || '';
  }
}

export async function addMenuItemHelper(
  store: { get: any; set: any },
  source: RSSSource,
  group: string,
) {
  const { get, set } = store;
  const menu = new Menu(source, group);
  if (get().menu?.find((m) => m.key === menu.key)) {
    return;
  }
  await set({
    menu: get().menu.concat(menu),
  });
  setStoreMenu(get().menu);
}
