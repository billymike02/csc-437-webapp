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
      stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/styles.css",
      ],
      styles: [css``],
      scripts: [``],
    });
  }

  renderBody() {
    const { title, startDate, endDate, entries } = this.data;

    const formattedDate = startDate.toLocaleDateString();
    const numEntries = entries?.length || 0;

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

        <h1>Journal</h1>
      </header>
      <div style="display: flex; flex-direction: column;">
        <test-list src="/api/journals/672a6ce29157077895601de8"> </test-list>
        <span>Journal Title: ${title}</span>
        <span>Start Date: ${formattedDate}</span>
        <span>Number of entries: ${numEntries}</span>
      </div>

      <textarea id="w3review" name="w3review" rows="4" cols="50">
At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
</textarea>

      <form id="create-new-form">
        <button
          type="submit"
          style="background: none; border: none; cursor: pointer;"
        >
          Append entry
        </button>
      </form>

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
                title: "My New Journal",
                startDate: "2024-11-04T14:30:00Z",
              }),
            })
              .then((response) => {
                if (response.ok) {
                  alert("Entry appended successfully!");
                  window.location.reload();
                } else {
                  alert("Failed to append entry.");
                }
              })
              .catch((error) => console.error("Error:", error));
          });
      </script>
    `;
  }
}
