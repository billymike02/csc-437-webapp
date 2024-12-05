import { define, Events, Rest } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import resetCSS from "../css/reset.ts"

define({ "restful-form": Rest.FormElement });

export class LoginForm extends LitElement {
    @property()
    message = "";

    render() {
        const init = { username: "", password: "" };
        return html`
            
            <h2>Login</h2>
            
      <restful-form
          
        new
        .init=${init}
        src="/auth/login"
        @mu-rest-form:created=${this._handleSuccess}
        @mu-rest-form:error=${this._handleError}>
          <label>
              <input name="username" autocomplete="off" placeholder="Username" />
          </label>
          <label>
              <input type="password" name="password" placeholder="Password"/>
          </label>
      </restful-form>
      <p class="error">
        ${this.message ? "Invalid Username or Password" : ""}
      </p>
      <pre>${this.message}</pre>
      <a href="/app/register">No account? Sign up here.</a>
    `;
    }

    static styles = [resetCSS, css`
    .error {
      color: firebrick;
    }
        
    *
    {
        justify-content: center;
        display: flex;
        align-items: center;

    }
        
    input
    {
        height: 40px;
        font-size: var(--font-size-medium);
        font-weight: normal;
        background-color: var(--interactive-element-color);
        border-radius: var(--rounded-corners-small);
        margin-bottom: 10px;
        padding: 3px;
        padding-inline: 10px;
        border-width: 0;
        color: var(--color-text-default);
    }
  `];

    get next() {
        let query = new URLSearchParams(document.location.search);
        return query.get("next");
    }

    _handleSuccess(event: CustomEvent) {
        const detail = event.detail;
        const { token } = detail.created;
        const redirect = this.next || "/";
        console.log("Login successful", detail, redirect);

        Events.relay(event, "auth:message", [
            "auth/signin",
            { token, redirect }
        ]);
    }

    _handleError(event: CustomEvent) {
        const { error } = event.detail as { error: Error };
        console.log("Login failed", event.detail);
        this.message = error.toString();
    }
}
