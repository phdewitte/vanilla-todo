import Item from '../definitions/Item';

import Store from './Store';
import View from './View';

export default class Controller {
  public store: Store;
  public view: View;

  constructor(store: Store, view: View) {
    this.store = store;
    this.view = view;
    this.addItemToList('ham salad'); // temp
    this.addItemToList('fart salad'); // temp
  }

  public createItem(text: string): Item {
    return { text, id: String(Date.now()), checked: false };
  }

  public addItemToList(text: string) {
    const newItem = this.createItem(text);
    this.store.upsertItem(newItem);
    this.view.appendItem(newItem);
  }
}
