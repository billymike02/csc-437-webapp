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
  goals: () => goals
});
module.exports = __toCommonJS(goals_exports);
var import_express = __toESM(require("express"));
var import_goal_svc = __toESM(require("../services/goal-svc"));
const goals = import_express.default.Router();
goals.get("/", (_, res) => {
  import_goal_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
goals.post("/", (req, res) => {
  const newGoal = req.body;
  import_goal_svc.default.create(newGoal).then((goal) => res.status(201).json(goal)).catch((err) => res.status(500).send(err));
});
goals.get("/:goalid", (req, res) => {
  const { goalid } = req.params;
  import_goal_svc.default.get(goalid).then((goal) => res.json(goal)).catch((err) => res.status(404).send(err));
});
goals.put("/:goalid", (req, res) => {
  const { goalid } = req.params;
  const newGoal = req.body;
  import_goal_svc.default.update(goalid, newGoal).then((goal) => {
    if (!goal) {
      return res.status(404).json({ message: `Goal with ID ${goalid} not found` });
    }
    res.json(goal);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the journal" });
  });
});
goals.delete("/:goalid", (req, res) => {
  const { goalid } = req.params;
  import_goal_svc.default.remove(goalid).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  goals
});
