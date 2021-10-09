import styled from 'styled-components';
import { mq } from 'css-helpers/mixins';

const Grid = styled.div`
  display: grid;
`;

export const Grid2Cols = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  ${mq.tablet`
    grid-template-columns: 1fr;
    `}
`;

export const Grid3Cols = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
  ${mq.phone`
    grid-template-columns: 1fr 1fr;
    `}
`;
