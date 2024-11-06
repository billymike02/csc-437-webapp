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
var goals_exports = {};
__export(goals_exports, {
  GoalsPage: () => GoalsPage
});
module.exports = __toCommonJS(goals_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class GoalsPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/styles.css"
      ],
      styles: [import_server.css``],
      scripts: [``]
    });
  }
  renderBody() {
    const goals = this.data;
    return import_server.html`
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
      const startDate = goal.startDate ? goal.startDate.toLocaleDateString() : "N/A";
      const endDate = goal.endDate ? goal.endDate.toLocaleDateString() : "N/A";
      return import_server.html`
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalsPage
});
