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
var journals_exports = {};
__export(journals_exports, {
  journals: () => journals
});
module.exports = __toCommonJS(journals_exports);
var import_express = __toESM(require("express"));
var import_journal_svc = __toESM(require("../services/journal-svc"));
const journals = import_express.default.Router();
journals.get("/", (_, res) => {
  import_journal_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
journals.post("/", (req, res) => {
  const newJournal = req.body;
  import_journal_svc.default.create(newJournal).then((journal) => res.status(201).json(journal)).catch((err) => res.status(500).send(err));
});
journals.get("/:journalid", (req, res) => {
  const { journalid } = req.params;
  import_journal_svc.default.get(journalid).then((journal) => res.json(journal)).catch((err) => res.status(404).send(err));
});
journals.put("/:journalid", (req, res) => {
  const { journalid } = req.params;
  const newJournal = req.body;
  import_journal_svc.default.update(journalid, newJournal).then((journal) => {
    if (!journal) {
      return res.status(404).json({ message: `Journal with ID ${journalid} not found` });
    }
    res.json(journal);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the journal" });
  });
});
journals.delete("/:journalid", (req, res) => {
  const { journalid } = req.params;
  import_journal_svc.default.remove(journalid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  journals
});
