import { LitElement, css, html } from "lit";
import {define, Dropdown, Events} from "@calpoly/mustang";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}


export class BlazingHeaderElement extends LitElement {
    static uses = define({
        "drop-down": Dropdown.Element
    });


    render() {
        return html`
      <header>
        <!-- TODO: insert contents of header here -->
          <drop-down  >
              <div slot="actuator" class="nameButt">
                  <a >
                      <span id="userid">My Profile</span>
                  </a>
              </div>
             
              <menu>
                  <li>
                      <label @change=${toggleDarkMode}>
                          <input type="checkbox" />
                          Dark Mode
                      </label>
                  </li>

                  <li class="when-signed-out">
                      <a href="/login">Sign In</a>
                  </li>
              </menu>
          </drop-down>
      </header>
    `;
    }


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

