import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class AccommodationElement extends HTMLElement {
  static template = html`
    <template>
      <a><slot name="displayName">Friend Name Placeholder</slot></a>
    </template>
  `;

  static styles = css`
    * {
      font-weight: 800;
      cursor: pointer;
      text-transform: lowercase;
    }
  `;

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
    if (this.src) {
      console.log("Fetching from URL:", this.src); // Logs the source URL
      this.hydrate(this.src);
    }
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
