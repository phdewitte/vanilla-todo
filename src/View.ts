import Item from '../definitions/Item';

export default class View {
  public list: HTMLElement | null;

  constructor() {
    this.list = document.getElementById('todo-list');
  }

  public getIdForListItem(id: string) {
    return `li-${id}`;
  }

  public getListItemChildMarkup(item: Item) {
    const checkedString = item.checked ? 'checked' : '';
    // Research wrapped label-wrapped inputs and accessibility benefits
    return (
      `<input id=${item.id} type="checkbox" ${checkedString}>
      <label for=${item.id}>${item.text}</label>
      <button type="button" value=${item.id}>Delete Todo</button>`
    );
  }

  public getElement(id: string) {
    return document.getElementById(id);
  }

  public createListItem(item: Item) {
    const li = document.createElement('li');
    const id = this.getIdForListItem(item.id);
    li.setAttribute('id', id);
    li.innerHTML = this.getListItemChildMarkup(item);
    return li;
  }

  public appendListItem(item: Item) {
    const li = this.createListItem(item);
    this.list!.appendChild(li);
  }

  public editListItem(item: Item) {
    const idToUpdate = this.getIdForListItem(item.id);
    const elementToUpdate = document.getElementById(idToUpdate) as HTMLElement;
    const markup = this.getListItemChildMarkup(item);
    elementToUpdate.innerHTML = markup;
  }

  public removeListItem(item: Item) {
    const idToRemove = this.getIdForListItem(item.id);
    const elementToRemove = document.getElementById(idToRemove) as HTMLElement;
    elementToRemove!.parentNode!.removeChild(elementToRemove);
  }
}
