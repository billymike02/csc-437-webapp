import { define, Events, Rest } from "@calpoly/mustang";
import { html, LitElement } from "lit";

define({ "restful-form": Rest.FormElement });

export class SignupFormElement extends LitElement {
  render() {
    return html`
        <h2>Create a user here.</h2>
      <restful-form new src="/auth/register">
        <slot></slot>
          <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" />
          </label>
          <label>
              <span>Password:</span>
              <input type="password" name="password" />
          </label>
      </restful-form>
    `;
  }

  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  constructor() {
    super();

    this.addEventListener(
      "mu-rest-form:created",
      (event: Event) => {
        const detail = (event as CustomEvent).detail;
        const { token } = detail.created;
        const redirect = this.next || "/";
        console.log("Signup successful", detail, redirect);

        Events.relay(event, "auth:message", [
          "auth/signin",
          { token, redirect }
        ]);
      }
    );
  }
}
