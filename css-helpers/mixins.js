import { css } from 'styled-components';
import { breakpoints } from 'constants/breakpoints.constant';

export const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
