import { View } from "@calpoly/mustang";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { Friend } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class ProfileViewElement extends View<Model, Msg> {
    @property()
    userid?: string;

    @state()
    get profile(): Friend | undefined {
        return this.model.profile;
    }

    constructor() {
        super("blazing:model");
    }

    render() {

        const {
            username,
            age,
            weight,
        } = this.profile || {};

        if (this.profile == undefined)
        {
            return html`<h3>No profile found.</h3>`
        }

        const profileUrl = `wmwoodwa.csse.dev/app/profile/${username}`;


        return html`
            <h3>Username: ${username}</h3>
            <h3>Age: ${age || "N/A"}</h3>
            <h3>Weight: ${weight || "N/A"}</h3>
            <h3>Profile Link: ${profileUrl}</h3>
    `;
    }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (
            name === "userid" &&
            oldValue !== newValue &&
            newValue
        ) {
            this.dispatchMessage([
                "profile/select",
                { userid: newValue }
            ]);
        }
    }

}