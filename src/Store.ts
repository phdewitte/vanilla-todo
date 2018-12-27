import Dictionary from '../definitions/Dictionary';
import Item from '../definitions/Item';

export default class Store {
  public todos: Dictionary<Item> = {};

  public upsertItem(item: Item) {
    this.todos = {
      ...this.todos,
      [item.id]: item,
    };
  }

  public deleteItemById(id: string) {
    const workingTodos = { ...this.todos };
    delete workingTodos[id];
    this.todos = workingTodos;
  }
}
