export * from "./goal";
export * from "./journal";
export * from "./friend"


import { connect } from "../services/mongo";

connect("cluster0");
