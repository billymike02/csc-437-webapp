import {Auth, define, History, Switch, Store, Observer} from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import {css, html, LitElement} from "lit";
import { BlazingHeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view";
import {ProfileViewElement} from "./views/profile-view.ts";
import {LoginForm} from "./components/login-form";
import {UnknownViewElement} from "./views/unknown-view.ts";
import { JournalViewElement} from "./views/journal-view.ts";

let _user = new Auth.User();

const routes = [
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
        view: () => html`<journal-view class="journalView" journal-id="674e171fcdfafa1eeb94c694"></journal-view>`
    },
    {
        auth: "protected",
        path: "/app/journals/:id/edit",
        view: (params: Switch.Params) => html`
        <journal-view edit journal-id=${params.id}></journal-view>`
    },
    {
        path: "/app/goals/",
        view: () => html`<unknown-view />`
    },

    {
        path: "/app/habits/",
        view: () => html`<unknown-view></unknown-view>`
    },
    {
        path: "/app/physical/",
        view: () => html`<unknown-view />`
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
        "journal-view": JournalViewElement,
        "login-form": LoginForm,
        "mu-history": History.Provider,
        "unknown-view": UnknownViewElement,
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