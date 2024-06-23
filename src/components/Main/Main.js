import './Main.css';

export default class Main {
  constructor(content) {
    this.el = document.createElement('main');
    this.el.className = 'main-container';
    this.content = content;
    this.render();
  }

  render() {
    this.el.innerHTML = this.contents;
  }
}
