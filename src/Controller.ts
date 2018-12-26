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

    this.attachAddTodoListener();
  }

  public attachAddTodoListener() {
    const todoForm = document.getElementById('todo-form');
    todoForm!.addEventListener('submit', this.addItemToList);
  }

  // Is this necessary?
  // public removeAddTodoListener() {
  //   const todoForm = document.getElementById('todo-form');
  //   todoForm!.removeEventListener('submit', this.addItemToList);
  // }

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
