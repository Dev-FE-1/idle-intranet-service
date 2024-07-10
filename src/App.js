import Route from './routes/Route.js';
import Layout from './components/Layout.js';

class App {
  constructor() {
    this.Layout = new Layout();
    this.Route = new Route();

    this.init();
  }

  init() {
    this.Layout.render();
    this.Route.init();
  }
}

document.addEventListener('DOMContentLoaded', new App());
