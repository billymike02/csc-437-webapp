import { css } from "lit";

export default css`

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
`;