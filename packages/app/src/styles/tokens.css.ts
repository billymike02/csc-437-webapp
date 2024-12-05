import { css } from "lit";

const styles = css `
  :root {
    /* font stuffs */
    --font-family-display: "Afacad Flux", sans-serif;
    --font-family-body: "Roboto", sans-serif;
    --font-size-small: 12px;
    --font-size-medium: 18px;
    --font-size-large: 24px;
    --font-size-xlarge: 36px;

    /* color scheme of our app */
    --body-color: rgb(0, 0, 0);
    --color-text-default: rgb(255, 255, 255);
    --color-text-subtle: rgb(179 179 179);
    --body-highlight-color: rgb(51 51 51);
    --body-regular-color: rgb(31 31 31);
    --bright-accent-color: rgb(30 215 96);
    --button-color: rgb(62, 62, 62);

    /* visual niceties */
    --rounded-corners-regular: 16px;
    --rounded-corners-small: 8px;

    /* spacing rules */
    --margin-standard: 36px;
    --padding-standard: 24px;
    --gap-regular: 8px;
    --gap-large: 16px;

    /* animations */
    --transition-regular: 0.3s;
    --animated-scale: 1.03;
  }
`;

export default {styles};

