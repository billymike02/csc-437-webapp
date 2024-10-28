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
  getJournal: () => getJournal
});
module.exports = __toCommonJS(journal_svc_exports);
const journals = {
  daily_journal: {
    title: "Daily Journal",
    startDate: /* @__PURE__ */ new Date("2024-10-14"),
    endDate: /* @__PURE__ */ new Date("2025-10-14"),
    entries: [
      {
        date: /* @__PURE__ */ new Date("2024-10-14"),
        subject: "Started my journal"
      }
    ]
  }
};
function getJournal(_) {
  return journals["daily_journal"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getJournal
});
