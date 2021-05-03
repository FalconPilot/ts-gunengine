import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Arial';
    font-size: 12px;
  }
`
