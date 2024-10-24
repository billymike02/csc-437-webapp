import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class AccommodationElement extends HTMLElement {
  static template = html`
    <template>
      <ol>
        <li>
          <a><slot name="item-a">Fuck you</slot></a>
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
}
