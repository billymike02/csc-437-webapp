import {css, html} from "@calpoly/mustang/server";
import {Profile} from "models";
import renderPage from "./renderPage";

export class ProfilePage {
    data: Profile;

    constructor(data: Profile) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: [
                "/styles/reset.css",
                "/styles/tokens.css",
                "/styles/styles.css",
            ],
            styles: [css``],
            scripts: [
                `
                import { define, Auth } from "@calpoly/mustang";
                import { ProfileElement } from "/scripts/profile.js";
        
                define({
                   "mu-auth": Auth.Provider,
                  "profile-element": ProfileElement
                });
                `
            ],
        });
    }

    renderBody() {

        return html`
            <mu-auth provides="blazing:auth">
                <header>
                    <nav>
                        <a href="/">
                            <svg class="icon">
                                <use href="/icons/arrows.svg#arrow-back"/>
                            </svg>
                            <span>Home</span>
                        </a>
                    </nav>

                    <h1>Profile Page</h1>


                </header>
                <main>
                    <profile-element mode="view" src="/api/friends/672d040950ec2ddd1773d19d/"></profile-element>
                </main>
            </mu-auth>
        `;
    }
}
