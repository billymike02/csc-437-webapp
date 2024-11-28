"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var journal_exports = {};
__export(journal_exports, {
  JournalPage: () => JournalPage
});
module.exports = __toCommonJS(journal_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class JournalPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css.ts",
        "/styles/styles.css"
      ],
      styles: [import_server.css``],
      scripts: [``]
    });
  }
  renderBody() {
    const { _id, title, startDate, endDate, entries } = this.data;
    const formattedDate = startDate.toLocaleDateString();
    const numEntries = entries?.length || 0;
    return import_server.html`
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JournalPage
});
