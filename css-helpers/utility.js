import { css } from 'styled-components';

export const hoverEffect = css`
  & :hover {
    background-color: rgb(145 236 228);
    color: rgba(0, 73, 77);
  }
`;

const errorClass = css`
  & :hover {
    box-shadow: 0 0 0 0.3rem red;
  }
`;
