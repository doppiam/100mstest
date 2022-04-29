import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    background-color: #f4f5f9;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Barlow', sans-serif;
    position: relative;
    font-size: 1.5rem;
  }
  * {
      box-sizing: border-box;
  }
`;

export default GlobalStyle;
