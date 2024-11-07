"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_journal = require("./pages/journal");
var import_journals = require("./pages/journals");
var import_mongo = require("./services/mongo");
var import_journal_svc = __toESM(require("./services/journal-svc"));
var import_goal_svc = __toESM(require("./services/goal-svc"));
var import_journals2 = require("./routes/journals");
var import_goals = require("./routes/goals");
var import_friends = require("./routes/friends");
var import_goals2 = require("./pages/goals");
(0, import_mongo.connect)("blazing");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/journals", import_journals2.journals);
app.use("/api/goals", import_goals.goals);
app.use("/api/friends", import_friends.friends);
app.get("/journals/:journalid", async (req, res) => {
  const { journalid } = req.params;
  const data = await import_journal_svc.default.get(journalid);
  const page = new import_journal.JournalPage(data);
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/goals/", async (req, res) => {
  const data = await import_goal_svc.default.index();
  const page = new import_goals2.GoalsPage(data);
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/journals/", async (req, res) => {
  const data = await import_journal_svc.default.index();
  const page = new import_journals.JournalsPage(data);
  res.set("Content-Type", "text/html").send(page.render());
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
