import "../font-awesome/css/all.css";

const { css } = require("@emotion/react");

const { root } = require("./css-variable");

const GlobalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&family=Prompt:wght@200&display=swap");

  body {
    position: relative;
    padding-right: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 1rem;
    font-family: var(--default-font-th);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  div:focus {
    outline: unset;
  }

  section {
    position: relative;
    z-index: 2;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  * {
    box-sizing: border-box;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e2e2e2;
  }

  ${root}
`;

export default GlobalStyle;
