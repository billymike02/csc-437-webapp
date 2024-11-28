import { Auth, Observer } from "@calpoly/mustang";
import { html, css, LitElement } from "lit";
import reset from "../styles/reset.css";



export class HomeViewElement extends LitElement {

    src = ""

    static styles = [reset.styles, css`
      
        
        body {
            font-family: var(--font-family-body);
            max-width: 100vw;
            height: 100vh;
            max-height: 100vh;
            overflow: auto;
            margin: var(--margin-standard);
            display: flex;
            flex-direction: column;
            align-items: center;

        }

        body.light-mode {
            background-color: white;
        }

        a {
            color: var(--color-text);
            font-size: var();
        }

        div.centered {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--accent-color);
        }

        h1,
        h2,
        h3,
        h4 {
            font-family: var(--font-family-display);
        }

        svg.icon {
            display: inline;
            height: var(--font-size-large);
            width: var(--font-size-large);
            vertical-align: top;
            fill: currentColor;
        }

        a.profile-dropdown {
            display: flex;
            align-items: center;
            max-width: fit-content;
            padding: var(--padding-standard);
            border-radius: 50px;
            background-color: var(--body-regular-color);
            color: var(--color-text-inverted);
            gap: 8px;
        }

        a.profile-dropdown img {
            border-radius: 50px;
            height: 32px;
            width: 32px;
        }

        .button {
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }

        .button:hover {
            transform: scale(var(--animated-scale));
        }

      

        /* this is where we'll demo grids */
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

        div.wrapper > div {
            background-color: var(--body-regular-color);
            border-radius: 3rem;
            padding: 40px;
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

        @media (max-width: 768px) {
            /* Adjust the width based on your needs */
            div.wrapper {
                grid-template-columns: repeat(6, 1fr); /* Reduce to 6 columns */
            }

            div.wrapper .pages-container {
                grid-column: 1 / span 6; /* Take up the full width */
                grid-row: 1; /* Stack it on top */
            }

            div.wrapper .info-container {
                grid-column: 1 / span 6; /* Also take up the full width */
                grid-row: 2; /* Stack it below */
            }
        }

        header nav a {
            display: flex;
            align-items: center;
            flex-direction: row;
            padding: var(--padding-standard);
            border-radius: var(--rounded-corners-regular);
            gap: var(--gap-regular);
            transition: all var(--transition-regular);
        }

        header nav a:hover {
            background-color: var(--button-color);
            scale: var(--animated-scale);
        }

        header nav a {
            font-size: var(--font-size-large);
        }

        header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 48px;
            margin-bottom: 48px;
        }

        header h1 {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
        }

        ol {
            display: flex;
            flex-direction: column;
            gap: var(--gap-regular);
            padding-left: 0;
        }

        ol {
            padding-left: 0;
        }

        ol li {
            cursor: pointer;
        }

        ol li a {
            background-color: var(--button-color);
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

        body.dark-mode {
            background-color: var(--body-color);
            color: var(--color-text-default);
        }

        body.light-mode ol li a {
            background-color: gray;
        }

        body.light-mode div.wrapper > div {
            background-color: lightgray;
        }

        body.light-mode a.profile-dropdown {
            background-color: gray;
        }

        span {
            display: block;
        }

        main
        {
            width: 100%;
        }


    `];

    render() {
        return html`

          <div class="wrapper">

              <div class="pages-container">
                  <ol class="entry-tab">
                      <h1>Personal Wellness!</h1>
                      <li>
                          <a href="/journals/">
                              Journal
                              <svg class="icon">
                                  <use href="/icons/misc.svg#book" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="/goals/">
                              Goals
                              <svg class="icon">
                                  <use href="/icons/misc.svg#goal" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="./habits.html">
                              Habits
                              <svg class="icon">
                                  <use href="/icons/misc.svg#habit" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="./physical.html">
                              Physical
                              <svg class="icon">
                                  <use href="/icons/misc.svg#physical" />
                              </svg>
                          </a>
                      </li>
                      <li>
                          <a href="./metrics.html">
                              Metrics
                              <svg class="icon">
                                  <use href="/icons/misc.svg#metric" />
                              </svg>
                          </a>
                      </li>
                  </ol>
              </div>
              <div class="info-container">
                  <h1>Welcome back, Billy</h1>
                  <ol>
                      <li>
                          <h3>Account created:</h3>
                          Thursday, Oct 17, 2024
                      </li>
                      <li>
                          <h3>Last login:</h3>
                          Friday, Oct 18, 2024
                      </li>
                      <li>
                          <h3>Last activity:</h3>
                          Wednesday, Oct 16, 2024
                      </li>
                  </ol>
              </div>
              <div class="misc-container" style="flex-direction: column">
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
        this._authObserver.observe(({ user }) => {
            if (user) {
                this._user = user;
            }
            this.hydrate(this.src);
        });
    }
}