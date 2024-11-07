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
var friends_exports = {};
__export(friends_exports, {
  friends: () => friends
});
module.exports = __toCommonJS(friends_exports);
var import_express = __toESM(require("express"));
var import_friend_svc = __toESM(require("../services/friend-svc"));
const friends = import_express.default.Router();
friends.get("/", (_, res) => {
  import_friend_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
friends.post("/", (req, res) => {
  const newFriend = req.body;
  import_friend_svc.default.create(newFriend).then((friend) => res.status(201).json(friend)).catch((err) => res.status(500).send(err));
});
friends.get("/:friendid", (req, res) => {
  const { friendid } = req.params;
  import_friend_svc.default.get(friendid).then((friend) => res.json(friend)).catch((err) => res.status(404).send(err));
});
friends.put("/:friendid", (req, res) => {
  const { friendid } = req.params;
  const newFriend = req.body;
  import_friend_svc.default.update(friendid, newFriend).then((friend) => {
    if (!friend) {
      return res.status(404).json({ message: `Friend with ID ${friendid} not found` });
    }
    res.json(friend);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the friend" });
  });
});
friends.delete("/:friendid", (req, res) => {
  const { friendid } = req.params;
  import_friend_svc.default.remove(friendid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  friends
});
