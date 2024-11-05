import { css, html } from "@calpoly/mustang/server";
import { Goal, Journal } from "models";
import renderPage from "./renderPage";

export class GoalPage {
  data: Goal;

  constructor(data: Goal) {
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
    const { name, startDate, endDate } = this.data;

    const formattedDate = startDate?.toLocaleDateString() || "No start date.";
    const formattedEndDate = endDate?.toLocaleDateString() || "No end date.";

    return html`
      <div style="display: flex; flex-direction: column;">
        <test-list src="/api/journals/672a6ce29157077895601de8"> </test-list>
        <span>Goal Name: ${name}</span>
        <span>Start Date: ${formattedDate}</span>
        <span>End Date: ${formattedDate}</span>
      </div>
    `;
  }
}
