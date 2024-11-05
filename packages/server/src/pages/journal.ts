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

    const formattedDate = startDate.toLocaleDateString();
    const numEntries = entries?.length || 0;

    return html`
      <div style="display: flex; flex-direction: column;">
        <test-list src="/api/journals/672a6ce29157077895601de8"> </test-list>
        <span>Journal Title: ${title}</span>
        <span>Start Date: ${formattedDate}</span>
        <span>Number of entries: ${numEntries}</span>
      </div>
    `;
  }
}
