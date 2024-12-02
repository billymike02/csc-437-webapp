import { css, html } from "lit";
import {Auth, define, Dropdown, Observer, View} from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Friend} from "server/models";
import {property, state} from "lit/decorators.js";



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

        console.log("found username:", this.username);

        const profileHref = `/app/profile/${username}`;

        return html`
      <header>
 
              <div slot="actuator" class="nameButt">
                  <a href=${profileHref}>
                      <span id="userid">Hello, ${this.username}</span>
                  </a>
              </div>
             

      </header>
    `;
    }

    _authObserver = new Observer<Auth.Model>(
        this,
        "blazing:auth"
    );


    static styles = css`
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
            background-color: var(--body-regular-color);
            padding: var(--padding-standard);
            border-radius: 50px;
            width: 240px;
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

        a[slot="actuator"] {

            cursor: pointer;
        }

        #userid:empty::before {
            content: "traveler";
        }

        menu a {

            cursor: pointer;
            text-decoration: underline;
        }

        a:has(#userid:empty) ~ menu > .when-signed-in,
        a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
            display: none;
        }
    `;

}

