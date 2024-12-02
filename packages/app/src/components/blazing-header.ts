import { css, html } from "lit";
import {Auth, define, Dropdown, Observer, View} from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Friend} from "server/models";
import {property, state} from "lit/decorators.js";
import resetCSS from "../css/reset.ts";



export class BlazingHeaderElement extends View<Model, Msg> {
    static uses = define({
        "drop-down": Dropdown.Element
    });

    @property()
    username = "anonymous";

    @state()
    get profile(): Friend | undefined {
        return this.model.profile;
    }

    constructor() {
        super("blazing:model");
    }



    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user && user.username !== this.username) {
                this.username = user.username;
                this.dispatchMessage([
                    "profile/select",
                    { userid: this.username }
                ]);
            }
        });
    }

    render() {

        const { username } =
        this.profile || {};

        const profileHref = `/app/profile/${username}`;

        return html`
      <header>

                  <a href=${profileHref} class="nameButt">
                      <span id="userid">Logged in as ${this.username}</span>
                  </a>

      </header>
    `;
    }

    _authObserver = new Observer<Auth.Model>(
        this,
        "blazing:auth"
    );


    static styles = [resetCSS,
        css`
        :host {
            display: contents;
        }

        header {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            width: 100%;
            margin-bottom: var(--margin-standard);


        }

        header ~ * {

        }

        header p {

        }
        
        .nameButt
        {
            background-color: var(--interactive-element-color);
            padding: var(--padding-standard);
            border-radius: 50px;
            width: 240px;
            transition: var(--transition-regular);
        }
            
        .nameButt:hover {
            scale: 1.1;
            background-color: var(--interactive-element-color-inverted);
            color: var(--color-text-default-inverted);
        }

        nav {
            display: flex;
            flex-direction: column;
            flex-basis: max-content;
            align-items: end;
            background-color: var(--button-color);
            padding: var(--padding-standard);
            border-radius: var(--rounded-corners-regular);
        }
            
            

        menu a {

            cursor: pointer;
            text-decoration: underline;
        }

    `];

}

