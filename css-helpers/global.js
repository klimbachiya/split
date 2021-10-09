import { createGlobalStyle } from 'styled-components';
import { mq } from 'css-helpers/mixins';

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
    ${mq.tablet`
        font-size: 56.25%;
    `}
      ${mq.phone`
  font-size: 50%;
    `}
}


*:focus {
  outline: none;
  /* box-shadow: 0 0 0 0.3rem rgba(0, 73, 77, 0.5); dark shade */
  /* box-shadow: 0 0 0 0.3rem rgba(127, 156, 159, 0.5); */
  box-shadow: 0 0 0 0.3rem rgba(31, 197, 182, 0.5);
}

body {
  font-family: 'Rubik', sans-serif;
  line-height: 1;
  font-weight: 400;
  color: #555;
}
`;

export default GlobalStyles;
