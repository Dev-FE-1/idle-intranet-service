import Layout from './components/Layout.js';
import Header from './components/Header/Header.js';
import NavBar from './components/NavBar/NavBar.js';
import Route from './routes/Route.js';

class App {
  constructor() {
    this.Layout = new Layout({ container: '#app' });
    this.Header = new Header({ container: '.header-container' });
    this.NavBar = new NavBar({ container: '.navbar' });
    this.Route = new Route();
  }
}

document.addEventListener('DOMContentLoaded', new App());
