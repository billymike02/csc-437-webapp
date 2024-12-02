import { View } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class UnknownViewElement extends View<Model, Msg> {


    constructor() {
        super("blazing:model");
    }

    render() {

        return html`
            <h2>We're under construction. Come back later!</h2>
    `;
    }

}