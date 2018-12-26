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
    this.toggleItemChecked = this.toggleItemChecked.bind(this);

    this.attachAddTodoListener();
    this.attachToggleCheckedListener();
  }

  public attachAddTodoListener() {
    const form = document.getElementById('todo-form');
    form!.addEventListener('submit', this.addItemToList);
  }

  public attachToggleCheckedListener() {
    const list = document.getElementById('todo-list');
    list!.addEventListener('click', this.toggleItemChecked);
  }

  public toggleItemChecked(event: Event) {
    // event.target is not always an element;
    const { nodeName, id } = event.target as HTMLElement;

    if (nodeName !== 'INPUT') {
      return;
    }

    const item = this.store.todos[id];
    this.store.upsertItem({ ...item, checked: !item.checked });
  }

  public createItem(): Item {
    // 'value' property does not exist on HTMLElement type
    const inputElement = document.getElementById('todo-input') as HTMLInputElement;
    const text = inputElement.value;

    inputElement.value = '';

    return { text, id: String(Date.now()), checked: false };
  }

  public addItemToList(event: Event) {
    event.preventDefault();

    const newItem = this.createItem();
    this.store.upsertItem(newItem);
    this.view.appendItem(newItem);
  }
}
