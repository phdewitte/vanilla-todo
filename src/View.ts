import Item from '../definitions/Item';

export default class View {
  public list: HTMLElement | null;

  constructor() {
    this.list = document.getElementById('todo-list');
  }

  public createListEntry(item: Item) {
    const li = document.createElement('li');
    const checkedString = item.checked ? 'checked' : '';
    // Research wrapped label-wrapped inputs and accessibility benefits
    const markup =
      `<input id=${item.id} type="checkbox" ${checkedString}><label for=${item.id}>${item.text}</label>`;
    li.innerHTML = markup;
    return li;
  }

  public appendItem(item: Item) {
    const li = this.createListEntry(item);
    this.list!.appendChild(li);
  }
}
