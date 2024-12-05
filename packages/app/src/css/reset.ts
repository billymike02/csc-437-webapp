import { css } from "lit";

export default css`
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
    a
    {
        color: var(--color-text-default);
        font-weight: bold;
    }

    div.animated
    {
        transition: scale var(--transition-regular);
    }
    div.animated:hover
    {
        scale: var(--animated-scale-small);
    }

    a
    {
        text-decoration: none;
        color: var(--color-text-default);
    }
`;