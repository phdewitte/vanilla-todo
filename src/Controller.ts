import Item from '../definitions/Item';

import Store from './Store';
import View from './View';

export default class Controller {
  public store: Store;
  public view: View;

  constructor(store: Store, view: View) {
    this.store = store;
    this.view = view;

    this.addTodo = this.addTodo.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);

    this.attachTodoFormSubmitListener();
    this.attachListItemClickListener();
  }

  public attachTodoFormSubmitListener() {
    const form = this.view.getElement('todo-form');
    form!.addEventListener('submit', this.addTodo);
  }

  public attachListItemClickListener() {
    const list = this.view.getElement('todo-list');
    list!.addEventListener('click', this.handleListItemClick);
  }

  public handleListItemClick(event: Event) {
    // TODO: Better way to pass id w/ both input and button elements?
    const { id, nodeName } = event.target as HTMLElement;
    if (nodeName === 'INPUT') {
      this.toggleTodo(id);
    } else if (nodeName === 'BUTTON') {
      const { value } = event.target as HTMLButtonElement;
      this.deleteTodo(value);
    }
  }

  public createTodoItem(): Item {
    const inputElement = this.view.getElement('todo-input') as HTMLInputElement;
    const text = inputElement.value;
    inputElement.value = '';
    return { text, id: String(Date.now()), checked: false };
  }

  public addTodo(event: Event) {
    event.preventDefault();
    const newItem = this.createTodoItem();
    this.store.upsertItem(newItem);
    this.view.appendListItem(newItem);
  }

  public toggleTodo(id: string) {
    const item = this.store.todos[id];
    const updatedItem = { ...item, checked: !item.checked };
    this.editTodo(updatedItem);
  }

  public editTodo(item: Item) {
    this.store.upsertItem(item);
    this.view.editListItem(item);
  }

  public deleteTodo(id: string) {
    const item = this.store.todos[id];
    this.store.deleteItemById(id);
    this.view.removeListItem(item);
  }
}
