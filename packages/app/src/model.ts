import { Friend } from "server/models";

export interface Model {
    profile?: Friend;
}

export const init: Model = {}