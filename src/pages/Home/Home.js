import Main from '../../components/Main.js';
import Title from '../../components/Title/Title.js';
import './Home.css';

export default class HomePage extends Main {
  constructor() {
    super();
    this.Title = new Title({
      title: '작은 큐브가 만드는 큰 변화, Cube.IT',
      subtitle: 'VISION & MISSION',
      description:
        'Cube.IT은 작은 아이디어로 큰 변화를 만들어갑니다. 혁신적인 큐브의 힘을 경험해 보세요.',
    });
  }

  render() {
    this.$container.innerHTML = `
      ${this.Title.html()}
    `;
  }
}
