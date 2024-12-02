import {Friend } from "server/models";

export type Msg =
    | ["profile/save",
    {
        userid: string;
        profile: Friend;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
    }]
    | ["profile/select", { userid: string }]
    | ["journal/save",
        {
            journalid: string;
            content: string;
            onSuccess?: () => void;
            onFailure?: (err: Error) => void;
        }
    ]
    ;