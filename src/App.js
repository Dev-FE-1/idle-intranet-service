import Route from './routes/Route.js';
import { storeInstance } from './components/Store.js';

class App {
  constructor() {
    this.Route = new Route();
    this.Store = storeInstance;

    this.init();
  }

  init() {
    this.Store.renderLayout();
    this.Route.init();
  }
}

document.addEventListener('DOMContentLoaded', new App());
