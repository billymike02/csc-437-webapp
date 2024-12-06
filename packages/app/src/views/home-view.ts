import { Auth, Observer } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import resetCSS from "../css/reset.ts";
import stylesCSS from "../css/styles.ts"
import {property} from "lit/decorators.js";


export class HomeViewElement extends LitElement {

    src = ""

    @property({ type: String })
    journalId = ""

    static styles = [resetCSS, stylesCSS, css`
        
        body.light-mode div.wrapper > div
        {
            background-color: red;
        }


        div.wrapper > div {
            background-color: var(--body-foreground-color);
            border-radius: 3rem;
            padding: 40px;
        }

        ol {
            display: flex;
            flex-direction: column;
            gap: var(--gap-regular);
            padding-left: 0;
        }

        ol li {
            cursor: pointer;
        }

        ol li a {
            background-color: var(--interactive-element-color);
            color: var(--color-text-default);
            padding: var(--padding-standard);
            border-radius: var(--rounded-corners-regular);
            display: flex;
            width: 100%;
            transition: all var(--transition-regular);
            gap: var(--gap-regular);
        }

        ol li a:hover {
            scale: var(--animated-scale);
        }
        
        div.wrapper {
            display: grid;
            grid-template-columns: repeat(12, 1fr); /* 12 equal-width columns */
            gap: var(--gap-large);
            grid-template-rows: repeat(2, 1fr);
            grid-auto-rows: minmax(100px, auto);
            width: 100vw; /* Ensure the wrapper takes up the full width of the screen */
            padding-left: var(--margin-standard);
            padding-right: var(--margin-standard);
        }
        
        div.wrapper .pages-container {
            grid-column: 1 / span 6;
            grid-row: 1 / span 2;
        }

        div.wrapper .info-container {
            grid-column: 7 / span 6;
            grid-row: 1;
        }

        div.wrapper .misc-container {
            grid-column: 7 / span 6;
            grid-row: 2;
        }

    `];

    render() {
        return html`

          <div class="wrapper">

              <div class="pages-container animated">
                  <ol class="entry-tab">
                      <h1>Personal Wellness!</h1>
                      <li>
                          <a href='/app/journals/${this.journalId}'>
                              Journal
                              <svg class="icon">
                                  <use href="/icons/misc.svg#book" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/goals/">
                              Goals
                              <svg class="icon">
                                  <use href="/icons/misc.svg#goal" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/habits/">
                              Habits
                              <svg class="icon">
                                  <use href="/icons/misc.svg#habit" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/physical/">
                              Physical
                              <svg class="icon">
                                  <use href="/icons/misc.svg#physical" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/app/metrics/">
                              Metrics
                              <svg class="icon">
                                  <use href="/icons/misc.svg#metric" />
                              </svg>
                          </a>
                      </li>
                  </ol>
              </div>
              <div class="info-container animated">
                  <h1>Welcome back</h1>
                  
              </div>
              <div class="misc-container animated" style="flex-direction: column">
                  <h1>Friend Activity</h1>
              </div>
          </div>


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

        this._authObserver.observe(async ({ user }) => {
            if (user) {
                this._user = user;

                console.log("connected callback")

                const response = await fetch(`/api/friends/${user.username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                const data = await response.json();

                if (data.journalId)
                {
                    console.log("set journal id to:", data.journalId);
                    this.journalId = data.journalId;
                }
            }


            this.hydrate(this.src);
        });
    }
}