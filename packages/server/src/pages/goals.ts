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
      stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/styles.css",
      ],
      styles: [css``],
      scripts: [
        `
        const savedTheme = localStorage.getItem("theme");

          if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
          } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");

          }`,
      ],
    });
  }

  renderBody() {
    const goals = this.data;

    return html`
      <header>
        <nav>
          <a href="/">
            <svg class="icon">
              <use href="/icons/arrows.svg#arrow-back" />
            </svg>
            <span>Home</span>
          </a>
        </nav>

        <h1>Goals</h1>
      </header>
      <main style="display: flex; justify-content: center;">
        <ol class="custom-list">
          ${goals.map((goal) => {
            const startDate = goal.startDate
              ? goal.startDate.toLocaleDateString()
              : "N/A";
            const endDate = goal.endDate
              ? goal.endDate.toLocaleDateString()
              : "N/A";

            return html`
              <li>
                <a style="display: flex; justify-content: space-between;">
                  <span>${goal.name}</span>
                  <span>Started: ${startDate}</span>
                  <span>Ending: ${endDate}</span>
                </a>
              </li>
            `;
          })}
          <li>
            <form id="create-new-form">
              <button
                type="submit"
                style="background: none; border: none; cursor: pointer;"
              >
                Create New
              </button>
            </form>
          </li>
        </ol>
      </main>
      <script>
        document
          .getElementById("create-new-form")
          .addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission

            fetch("/api/goals/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: "New Goal" }),
            })
              .then((response) => {
                if (response.ok) {
                  alert("Goal created successfully!");
                  window.location.reload();
                } else {
                  alert("Failed to create goal.");
                }
              })
              .catch((error) => console.error("Error:", error));
          });
      </script>
    `;
  }
}
