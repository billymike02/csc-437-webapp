import {Auth, define, History, Switch, Store, Observer} from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { html, LitElement} from "lit";
import { BlazingHeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view";
import {ProfileViewElement} from "./views/profile-view.ts";
import {LoginForm} from "./components/login-form";

let _user = new Auth.User();

const routes = [
    {
        path: "/app/tour/:id",
        view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
    },
    {
        auth: "protected",
        path: "/app",
        view: () => html`
            <home-view></home-view>
    `
    },
    {
        auth: "protected",
        path: "/app/profile/:id",
        view: (params: Switch.Params) => html`
      <profile-view userid=${params.id}></profile-view>
    `
    },
    {
        path: "/",
        redirect: "/app"
    },
    {
        path: "/app/journals/",
        view: () => html`<span>Journals</span>`
    },
    {
        path: "/app/login/",
        view: () => html`<login-form></login-form>`
    }

];

class AppElement extends LitElement {


    static uses = define({
        "home-view": HomeViewElement,
        "profile-view": ProfileViewElement,
        "login-form": LoginForm,
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

    _authObserver = new Observer<Auth.Model>(
        this,
        "blazing:auth"
    );



    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user) {
                _user = user;
            }
        });
    }
}



define({
    "mu-auth": Auth.Provider,
    "blazing-app": AppElement,
    "blazing-header": BlazingHeaderElement
});