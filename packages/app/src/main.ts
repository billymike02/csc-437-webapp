import { Auth, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { BlazingHeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view";

class AppElement extends LitElement {
    static uses = define({
        "home-view": HomeViewElement
    });

    protected render() {
        return html`
      <home-view></home-view>
    `;
    }

    connectedCallback(): void {
        super.connectedCallback();
        BlazingHeaderElement.initializeOnce();
    }
}

define({
    "mu-auth": Auth.Provider,
    "blazing-app": AppElement,
    "blazing-header": BlazingHeaderElement
});