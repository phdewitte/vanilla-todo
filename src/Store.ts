import Item from '../definitions/Item';

export default class Store {
  public todos = {};

  public upsertItem(item: Item) {
    this.todos = {
      ...this.todos,
      [item.id]: item, // Spread item?
    };
  }
}
