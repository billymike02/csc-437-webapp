import {Events, View} from "@calpoly/mustang";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { Friend } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import resetCSS from "../css/reset.ts"

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

        } = this.profile || {};

        if (this.profile == undefined)
        {


            return html`<h3>No profile found.</h3>
            <a href="#" @click=${signOutUser}>Login here.</a>`
        }

        const profileUrl = `wmwoodwa.csse.dev/app/profile/${username}`;


        return html`
            <h3>Username: ${username}</h3>

            <h3>Profile Link: ${profileUrl}</h3>
            <br />
            <a href="#" @click=${signOutUser}>Sign out</a>
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

    static styles = [resetCSS];

}

function signOutUser(ev: Event) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
}