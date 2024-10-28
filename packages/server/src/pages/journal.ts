import { css, html } from "@calpoly/mustang/server";
import { Journal } from "models";
import renderPage from "./renderPage";

export class JournalPage {
  data: Journal;

  constructor(data: Journal) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/journal.css"],
      styles: [css``],
      scripts: [``],
    });
  }

  renderBody() {
    const { title, startDate, endDate, entries } = this.data;

    return html` <span>Idk man</span> `;
  }
}
