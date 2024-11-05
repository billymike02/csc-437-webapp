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
var goal_svc_exports = {};
__export(goal_svc_exports, {
  default: () => goal_svc_default
});
module.exports = __toCommonJS(goal_svc_exports);
var import_mongoose = require("mongoose");
const GoalSchema = new import_mongoose.Schema({
  name: { type: String, required: true, trim: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false }
});
const GoalModel = (0, import_mongoose.model)("GoalSchema", GoalSchema);
function index() {
  return GoalModel.find();
}
function get(goalid) {
  return GoalModel.findById(goalid).then((goal) => {
    if (!goal) {
      throw new Error(`Goal with ID ${goalid} not found`);
    }
    return goal;
  }).catch((err) => {
    console.error(err);
    throw new Error("An error occurred while retrieving the goal");
  });
}
function create(json) {
  const j = new GoalModel(json);
  return j.save();
}
function update(goalid, goal) {
  return GoalModel.findOneAndUpdate({ _id: goalid }, goal, {
    new: true,
    useFindAndModify: false
    // Optional: depending on your Mongoose version
  }).then((updated) => {
    if (!updated) {
      throw new Error(`Goal with ID ${goalid} not found for update`);
    }
    return updated;
  });
}
function remove(goalid) {
  return GoalModel.findOneAndDelete({ _id: goalid }).then((deleted) => {
    if (!deleted) throw `${goalid} not deleted`;
  });
}
var goal_svc_default = { index, get, create, update, remove };
