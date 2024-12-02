import {Friend, Journal} from "server/models";

export interface Model {
    profile?: Friend;
    journal?: Journal;
}

export const init: Model = {}