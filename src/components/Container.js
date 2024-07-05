import { storeInstance } from './Store.js';

export default class Container {
  constructor(element) {
    this.$container = document.querySelector(element);
    this.store = storeInstance;
  }
}
