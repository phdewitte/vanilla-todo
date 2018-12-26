import Controller from './Controller';
import Store from './Store';
import View from './View';

const store = new Store();
const view = new View();
const controller = new Controller(store, view);
