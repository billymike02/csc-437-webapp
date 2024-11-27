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
          <span>A header</span>
          <drop-down>
              <a slot="actuator">
                  Hello,
                  <span id="userid">User</span>
              </a>
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

    static initializeOnce() {
        function toggleDarkMode(
            page: HTMLElement,
            checked: boolean
        ) {
            page.classList.toggle("dark-mode", checked);
        }

        document.body.addEventListener("dark-mode", (event) =>
            toggleDarkMode(
                event.currentTarget as HTMLElement,
                (event as CustomEvent).detail?.checked
            )
        );
    }

    static styles = css`
    /* TODO: Style the header here */
  `;
}

