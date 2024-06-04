const ESStore = window.electron.store;

const ES_STORE_KEY = {
  APP: {
    SOURCES: 'app.sources',
    MENU: 'app.menu',
  },
};

export function getStoreSource() {
  return ESStore.get(ES_STORE_KEY.APP.SOURCES);
}

export function setStoreSource(source: any) {
  ESStore.set(ES_STORE_KEY.APP.SOURCES, source);
}

export function getStoreMenu() {
  return ESStore.get(ES_STORE_KEY.APP.MENU);
}

export function setStoreMenu(menu: any) {
  ESStore.set(ES_STORE_KEY.APP.MENU, menu);
}
