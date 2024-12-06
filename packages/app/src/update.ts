import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import {Friend, Journal} from "server/models";

export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
) {
    switch (message[0]) {
        case "profile/select":

            selectProfile(message[1], user).then((profile) =>
                apply((model) => ({ ...model, profile }))
            );
            break;
        case "journal/select":
            selectJournal(message[1], user).then((journal) =>
                apply((model) => ({ ...model, journal }))
            );
            break;
        // put the rest of your cases here
        case "journal/save":
            console.log("saving journal")
            saveJournal(message[1], user)
                .then((journal) =>
                    apply((model) => ({ ...model, journal }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        default:
            const unhandled: string = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function saveJournal(
    msg: {
        journalid: string;
        content: string;
    },
    user: Auth.User
) {

    console.log("CONTENT: ", msg.content);

    return fetch(`/api/journals/${msg.journalid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.content)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            else
                throw new Error(
                    `Failed to save journal for ${msg.journalid}`
                );
        })
        .then((json: unknown) => {
            if (json) return json as Journal;
            return undefined;
        });
}

function selectJournal(
    msg: { journalid: string },
    user: Auth.User
) {

    return fetch(`/api/journals/${msg.journalid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Journal FOUNDDAWSDS:", json);
                return json as Journal;
            }
        });
}

function selectProfile(
    msg: { userid: string },
    user: Auth.User
) {

    return fetch(`/api/friends/${msg.userid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Profile:", json);
                return json as Friend;
            }
        });
}