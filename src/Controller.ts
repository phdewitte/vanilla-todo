import Item from '../definitions/Item';

import Store from './Store';
import View from './View';

export default class Controller {
  public store: Store;
  public view: View;

  constructor(store: Store, view: View) {
    this.store = store;
    this.view = view;

    this.addItemToList = this.addItemToList.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);

    this.attachAddTodoListener();
    this.attachItemClickListener();
  }

  public attachAddTodoListener() {
    const form = document.getElementById('todo-form');
    form!.addEventListener('submit', this.addItemToList);
  }

  public attachItemClickListener() {
    const list = document.getElementById('todo-list');
    list!.addEventListener('click', this.handleListItemClick);
  }

  public handleListItemClick(event: Event) {
    const { id, nodeName } = event.target as HTMLElement;

    if (nodeName === 'INPUT') {
      const item = this.store.todos[id];
      const updatedItem = { ...item, checked: !item.checked };
      this.editItem(updatedItem);
    } else if (nodeName === 'BUTTON') {
      const { value } = event.target as HTMLButtonElement;
      const item = this.store.todos[value];
      this.deleteItem(item);
    }
  }

  public createItem(): Item {
    const inputElement = document.getElementById('todo-input') as HTMLInputElement;
    const text = inputElement.value;

    inputElement.value = '';

    return { text, id: String(Date.now()), checked: false };
  }

  public addItemToList(event: Event): void {
    event.preventDefault();

    const newItem = this.createItem();
    this.store.upsertItem(newItem);
    this.view.appendItem(newItem);
  }

  public editItem(item: Item): void {
    this.store.upsertItem(item);
    // TODO: View is currently 'uncontrolled'. Add view update
  }

  public deleteItem(item: Item): void {
    this.store.deleteItemById(item.id);
    this.view.removeItem(item);
  }
}
