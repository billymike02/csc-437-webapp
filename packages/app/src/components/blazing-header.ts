import {css, html} from "lit";
import {Auth, define, Dropdown, Events, Observer, View} from "@calpoly/mustang";
import {Msg} from "../messages";
import {Model} from "../model";
import {Friend} from "server/models";
import {property, state} from "lit/decorators.js";
import resetCSS from "../css/reset.ts";


type Checkbox = HTMLInputElement & { checked: boolean };

function _toggleDarkMode(ev: InputEvent)
{
    console.log("toggleDarkMode");
    const target = ev.target as Checkbox;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}



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
        this._authObserver.observe(({user}) => {
            if (user && user.username !== this.username) {
                this.username = user.username;
                this.dispatchMessage([
                    "profile/select",
                    {userid: this.username}
                ]);
            }
        });
    }

    render() {

        const {username} =
        this.profile || {};

        const profileHref = `/app/profile/${username}`;

        return html`
            <header>
                <a href="/app">
                    <svg class="icon" >
                        <use href="/icons/misc.svg#home"/>
                    </svg>
                </a>

                <div class="right-section">

                        <svg class="icon" @click=${_toggleDarkMode}>
                            <use href="/icons/misc.svg#moon"></use>
                        </svg>

                    <a href="${profileHref}" class="nameButt">
                        <span id="userid">Your Profile</span>
                    </a>



                </div>


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

            svg.icon {
                display: inline;
                height: var(--font-size-xlarge);
                width: var(--font-size-xlarge);
                vertical-align: top;
                fill: currentColor;
                transition: scale var(--transition-regular);
                cursor: pointer;
            }

            svg.icon:hover {
                scale: 1.3;
            }

            svg.icon:active {
                transition: scale 0.1s;
                scale: 1.15;
            }
            

            header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 100%;
                margin-bottom: var(--margin-standard);
                align-items: center;
                gap: var(--gap-large);
             
            }

            .right-section {
                display: flex;
                align-items: center; /* Ensures profile link and moon icon are aligned vertically */
                gap: inherit;
            }

            header ~ * {

            }

            header p {

            }

            .nameButt {
                background-color: var(--body-foreground-color);
                padding: var(--padding-medium);
                border-radius: 50px;
                width: max-content;
                transition: var(--transition-regular);
                
            }

            .nameButt:hover {
                scale: 1.1;
               
                //padding: var(--padding-standard);
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

