import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class JournalPageElement extends HTMLElement {
  static template = html`
    <template>
      <span>Nothing to see here</a>
    </template>
  `;

  static styles = css``;

  constructor() {
    super();
    shadow(this)
      .template(AccommodationElement.template)
      .styles(reset.styles, AccommodationElement.styles);
  }

  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  hydrate(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) => console.log(`Failed to render data ${url}:`, error));
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => html`<span slot="${key}">${value}</span>`;

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }
}
