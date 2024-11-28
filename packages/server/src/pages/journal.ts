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
        "/styles/tokens.css.ts",
        "/styles/styles.css",
      ],
      styles: [css``],
      scripts: [``],
    });
  }

  renderBody() {
    const { _id, title, startDate, endDate, entries } = this.data;

    const formattedDate = startDate.toLocaleDateString();
    const numEntries = entries?.length || 0;

    return html`
      <header>
        <nav>
          <a href="/journals/">
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

            fetch("/api/journals/${_id.toString()}") // Adjust the URL as needed
              .then((response) => response.json())
              .then((data) => {
                // Assuming the entries are part of the response body
                const currentEntries = data.entries || []; // Default to empty array if no entries found

                // Get the new entry from the textarea
                const newEntry = document.getElementById("w3review").value;

                // Append the new entry to the current entries
                const updatedEntries = [...currentEntries, newEntry];

                // Send the updated entries array in the PUT request
                fetch("/api/journals/${_id.toString()}", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    entries: updatedEntries,
                    title: "stinky2", // Assuming title is fixed for now
                  }),
                })
                  .then((response) => {
                    if (response.ok) {
                      alert("Entry appended successfully!");
                      window.location.reload(); // Reload to reflect changes
                    } else {
                      alert("Failed to append entry.");
                    }
                  })
                  .catch((error) => console.error("Error:", error));
              })
              .catch((error) =>
                console.error("Error fetching current entries:", error)
              );
          });
      </script>
    `;
  }
}
