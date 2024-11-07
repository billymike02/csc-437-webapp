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
var friend_svc_exports = {};
__export(friend_svc_exports, {
  default: () => friend_svc_default
});
module.exports = __toCommonJS(friend_svc_exports);
var import_mongoose = require("mongoose");
const FriendSchema = new import_mongoose.Schema({
  displayName: { type: String, required: true, trim: true }
});
const FriendModel = (0, import_mongoose.model)("FriendSchema", FriendSchema);
function index() {
  return FriendModel.find();
}
function get(friendid) {
  return FriendModel.findById(friendid).then((friend) => {
    if (!friend) {
      throw new Error(`Goal with ID ${friendid} not found`);
    }
    return friend;
  }).catch((err) => {
    console.error(err);
    throw new Error("An error occurred while retrieving the friend");
  });
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
var friend_svc_default = { index, get, create, update, remove };
