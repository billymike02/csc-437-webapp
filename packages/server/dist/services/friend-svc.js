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
var friend_svc_exports = {};
__export(friend_svc_exports, {
  default: () => friend_svc_default
});
module.exports = __toCommonJS(friend_svc_exports);
var import_mongoose = require("mongoose");
var import_journal_svc = __toESM(require("../services/journal-svc"));
const FriendSchema = new import_mongoose.Schema({
  username: { type: String, required: true, trim: true },
  age: { type: Number, required: false },
  weight: { type: Number, required: false },
  journalId: { type: String, ref: "Journal", required: true }
  // Add this
});
const FriendModel = (0, import_mongoose.model)("FriendSchema", FriendSchema);
function index() {
  return FriendModel.find();
}
function get(username) {
  return FriendModel.find({ username }).then((list) => list[0]).catch(() => {
    throw `${username} Not Found`;
  });
}
async function createFromUsername(username) {
  const new_Journal = await import_journal_svc.default.createDefault();
  let journalId = new_Journal._id;
  const new_user = { username, journalId };
  const j = new FriendModel(new_user);
  return j.save();
}
function create(json) {
  const j = new FriendModel(json);
  return j.save();
}
function update(friendid, friend) {
  return FriendModel.findOneAndUpdate({ _id: friendid }, friend, {
    new: true,
    useFindAndModify: false
    // Optional: depending on your Mongoose version
  }).then((updated) => {
    if (!updated) {
      throw new Error(`Friend with ID ${friendid} not found for update`);
    }
    return updated;
  });
}
function remove(friendid) {
  return FriendModel.findOneAndDelete({ _id: friendid }).then((deleted) => {
    if (!deleted) throw `${friendid} not deleted`;
  });
}
var friend_svc_default = { index, get, create, update, remove, createFromUsername };
