import Item from '../definitions/Item';

export default class View {
  public list: HTMLElement | null;

  constructor() {
    this.list = document.getElementById('list');
  }

  public createListEntry(item: Item) {
    const li = document.createElement('li');
    const markup = `<label><input type="checkbox">${item.text}</label>`;
    li.innerHTML = markup;
    return li;
  }

  public appendItem(item: Item) {
    const li = this.createListEntry(item);
    this.list!.appendChild(li);
  }
}
