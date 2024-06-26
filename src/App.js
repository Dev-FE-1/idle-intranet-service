import Layout from './components/Layout';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Route from './routes/Route';

class App {
  constructor() {
    this.Layout = new Layout({ container: '#app' });
    this.Header = new Header({ container: '.header-container' });
    this.NavBar = new NavBar({ container: '.navbar' });
    this.Route = new Route();
  }
}

document.addEventListener('DOMContentLoaded', new App());
