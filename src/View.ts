import Item from '../definitions/Item';

export default class View {
  public list: HTMLElement | null;

  constructor() {
    this.list = document.getElementById('todo-list');
  }

  public getIdForListItem(id: string) {
    return `li-${id}`;
  }

  public createListEntry(item: Item) {
    const li = document.createElement('li');
    li.setAttribute('id', this.getIdForListItem(item.id));

    const checkedString = item.checked ? 'checked' : '';

    // Research wrapped label-wrapped inputs and accessibility benefits
    const markup =
      `<input id=${item.id} type="checkbox" ${checkedString}>
      <label for=${item.id}>${item.text}</label>
      <button type="button" value=${item.id}>Delete Todo</button>`;

    li.innerHTML = markup;

    return li;
  }

  public appendItem(item: Item) {
    const li = this.createListEntry(item);
    this.list!.appendChild(li);
  }

  public removeItem(item: Item) {
    const idToRemove = this.getIdForListItem(item.id);
    const elementToRemove = document.getElementById(idToRemove) as HTMLElement;
    elementToRemove!.parentNode!.removeChild(elementToRemove);
  }
}
