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
var profile_exports = {};
__export(profile_exports, {
  ProfilePage: () => ProfilePage
});
module.exports = __toCommonJS(profile_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class ProfilePage {
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
      scripts: [
        `
                import { define, Auth } from "@calpoly/mustang";
                import { ProfileElement } from "/scripts/profile.js";
        
                define({
                   "mu-auth": Auth.Provider,
                  "profile-element": ProfileElement
                });
                `
      ]
    });
  }
  renderBody() {
    return import_server.html`
            <mu-auth provides="blazing:auth">
                <header>
                    <nav>
                        <a href="/">
                            <svg class="icon">
                                <use href="/icons/arrows.svg#arrow-back"/>
                            </svg>
                            <span>Home</span>
                        </a>
                    </nav>

                    <h1>Profile Page</h1>


                </header>
                <main>
                    <profile-element mode="view" src="/api/friends/672d040950ec2ddd1773d19d/"></profile-element>
                </main>
            </mu-auth>
        `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProfilePage
});
