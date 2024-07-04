import { COLORS } from '../../utils/constants.js';

export default class Icon {
  constructor({ svg, options = {} }) {
    this.svg = svg;
    this.color = options.color || COLORS.BLACK;
    this.size = options.size || '1rem';
  }

  html() {
    let svgHtml = this.svg;
    svgHtml = svgHtml.replace(/width="\d+"/, `width="${this.size}"`);
    svgHtml = svgHtml.replace(/height="\d+"/, `height="${this.size}"`);
    svgHtml = svgHtml.replace(/stroke="[^"]*"/g, `stroke="${this.color}"`);

    return svgHtml;
  }
}
