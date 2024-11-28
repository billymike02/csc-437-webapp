import { Friend } from "server/models";

export type Msg =
    | ["profile/save", { userid: string; profile: Friend }]
    | ["profile/select", { userid: string }]