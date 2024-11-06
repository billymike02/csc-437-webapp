import { css, html } from "@calpoly/mustang/server";
import { Goal, Journal } from "models";
import renderPage from "./renderPage";

export class GoalsPage {
  data: Goal[];

  constructor(data: Goal[]) {
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
    const goals = this.data;

    return html`
      ${goals.map((goal) => {
        const startDate = goal.startDate
          ? goal.startDate.toLocaleDateString()
          : "N/A";
        const endDate = goal.endDate
          ? goal.endDate.toLocaleDateString()
          : "N/A";

        return html`
          <div style="display: flex; flex-direction: column;">
            <span>Goal Name: ${goal.name}</span>
            <span>Start Date: ${startDate}</span>
            <span>End Date: ${endDate}</span>
          </div>
        `;
      })}
      <a href="/">Back</a>
    `;
  }
}
