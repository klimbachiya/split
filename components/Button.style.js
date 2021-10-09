import { hoverEffect } from 'css-helpers/utility';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  width: 100%;
  border: none;
  background-color: rgb(31 197 182);
  color: rgba(0, 73, 77);
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.8rem;
  cursor: pointer;
  ${hoverEffect}
`;

export default Button;
