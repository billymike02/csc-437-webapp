import { css, html } from "@calpoly/mustang/server";
import { Goal, Journal } from "models";
import renderPage from "./renderPage";

export class JournalsPage {
  data: Journal[];

  constructor(data: Journal[]) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css.ts",
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

          }
        `,
      ],
    });
  }

  renderBody() {
    const journals = this.data;

    const startDate = new Date();

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

        <h1>Journals</h1>
      </header>
      <main style="display: flex; justify-content: center;">
        <ol class="custom-list">
          ${journals.map((journal) => {
            const startDate = journal.startDate
              ? journal.startDate.toLocaleDateString()
              : "N/A";

            return html`
              <li>
                <a
                  style="display: flex; justify-content: space-between;"
                  href="/journals/${journal._id.toString()}"
                >
                  <span>${journal.title}</span>
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

            fetch("/api/journals/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: "New Journal",
                startDate: ${startDate.toLocaleDateString()},
              }),
            })
              .then((response) => {
                if (response.ok) {
                  alert("Journal created successfully!");
                  window.location.reload();
                } else {
                  alert("Failed to create a new journal.");
                }
              })
              .catch((error) => console.error("Error:", error));
          });
      </script>
    `;
  }
}
