import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import { Navigation } from '../../components/Navigation/Navigation';
import home from '../../pages/Home/Home';
import pageNotFound from '../../pages/PageNotFound/PageNotFound';

export default class Layout {
  constructor(container) {
    this.container = document.querySelector(container);
    this.header = new Header().el;
    this.nav = new Navigation().el;
    this.main = new Main().el;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.container.appendChild(this.header);
    this.container.appendChild(this.nav);
    this.container.appendChild(this.main);
  }

  loadContent(content) {
    switch (content) {
      case 'home':
        this.main.innerHTML = home();
        break;
      default:
        this.main.innerHTML = pageNotFound();
        break;
    }
  }
}
