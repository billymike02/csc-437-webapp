import { css } from "lit";

const styles = css `
    * {
        margin: 0;

        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        text-decoration: none;
    }

    body {
        line-height: 1.5;
    }
    img {
        max-width: 100%;
    }

    li {
        list-style: none;
    }
`;

export default { styles };