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
        return html`
            <span>Profile: ${this.userid}</span>
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