"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var journal_svc_exports = {};
__export(journal_svc_exports, {
  default: () => journal_svc_default
});
module.exports = __toCommonJS(journal_svc_exports);
var import_mongoose = require("mongoose");
const JournalSchema = new import_mongoose.Schema({
  title: { type: String, required: false, trim: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  content: { type: String, required: false }
});
const JournalModel = (0, import_mongoose.model)("Journal", JournalSchema);
function index() {
  return JournalModel.find();
}
function get(journalid) {
  return JournalModel.findById(journalid).then((journal) => {
    if (!journal) {
      throw new Error(`Journal with ID ${journalid} not found`);
    }
    return journal;
  }).catch((err) => {
    console.error(err);
    throw new Error("An error occurred while retrieving the journal");
  });
}
function create(json2) {
  const j = new JournalModel(json2);
  return j.save();
}
function createDefault() {
  const content = "";
  const new_journal = { content };
  const j = new JournalModel(new_journal);
  console.log("Creating journal for user.");
  return j.save();
}
function update(journalid, journal) {
  return JournalModel.findOneAndUpdate({ _id: journalid }, journal, {
    new: true
  }).then((updated) => {
    if (!updated) {
      throw new Error(`Journal with ID ${journalid} not found for update`);
    }
    return updated;
  });
}
function remove(journalid) {
  return JournalModel.findOneAndDelete({ _id: journalid }).then((deleted) => {
    if (!deleted) throw `${journalid} not deleted`;
  });
}
var journal_svc_default = { index, get, create, update, remove, createDefault };
