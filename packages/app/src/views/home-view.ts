import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";


export class HomeViewElement extends LitElement {

    src = ""

    render() {


        return html`
      <main class="page">
        <header>
          <h2><a>Your Trips</a></h2>
        </header>

      </main>
    `;
    }

    hydrate(url: string) {
        fetch(url, {
            headers: Auth.headers(this._user)
        })
            .then((res: Response) => {
                if (res.status === 200) return res.json();
                throw `Server responded with status ${res.status}`;
            })
            .then((json: unknown) => {
                if (json) {

                }
            })
            .catch((err) =>
                console.log("Failed to tour data:", err)
            );
    }

    _authObserver = new Observer<Auth.Model>(
        this,
        "blazing:auth"
    );

    _user = new Auth.User();

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user) {
                this._user = user;
            }
            this.hydrate(this.src);
        });
    }
}