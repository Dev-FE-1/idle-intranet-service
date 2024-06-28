import './Table.css';

export default class Table {
  constructor({ headers, contents }) {
    this.headers = headers;
    this.contents = contents;
    this.width = Math.floor(100 / headers.length);
  }

  html() {
    return `
      <div class="table-wrapper">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${this.headers.map((header) => `<th style="width: ${this.width}%;">${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${this.contents
                .map(
                  (content) =>
                    `<tr>${content.map((td) => `<td>${td}</td>`).join('')}</tr>`,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
