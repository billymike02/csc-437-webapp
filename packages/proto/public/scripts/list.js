import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class AccommodationElement extends HTMLElement {
  static template = html`
    <template>
      <ol>
        <li>
          <a><slot name="item-a"></slot></a>
        </li>
        <li>
          <a><slot name="item-b"></slot></a>
        </li>
        <li>
          <a><slot name="item-c"></slot></a>
        </li>
      </ol>
    </template>
  `;

  static styles = css`
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
