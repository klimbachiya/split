import styled from 'styled-components';
import { mq } from 'css-helpers/mixins';

const Container = styled.div`
  max-width: 150rem;
  width: 100%;
  background-color: rgb(197, 228, 231);
  display: flex;
  justify-content: center;

  ${mq.desktop`
       height: 100%;
    `}
`;

export default Container;
