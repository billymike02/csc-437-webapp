import { Auth, define, History, Switch, Store } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { html, LitElement} from "lit";
import { BlazingHeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view";

const routes = [
    {
        path: "/app/tour/:id",
        view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
    },
    {
        path: "/app",
        view: () => html`
            <home-view></home-view>
    `
    },
    {
        path: "/app/profile",
        view: () => html`
            <span>Profile</span>
    `
    },
    {
        path: "/",
        redirect: "/app"
    }
];

class AppElement extends LitElement {


    static uses = define({
        "home-view": HomeViewElement,
        "mu-history": History.Provider,
        "mu-switch": class AppSwitch extends Switch.Element {
            constructor() {
                super(routes, "blazing:history", "blazing:auth");
            }
        },
        "mu-store": class AppStore extends Store.Provider<
            Model,
            Msg
        > {
            constructor() {
                super(update, init, "blazing:auth");
            }
        },
    });

    protected render() {
        return html`
      <home-view></home-view>
      
    `;
    }

    connectedCallback(): void {
        super.connectedCallback();
        // BlazingHeaderElement.initializeOnce();
    }
}



define({
    "mu-auth": Auth.Provider,
    "blazing-app": AppElement,
    "blazing-header": BlazingHeaderElement
});