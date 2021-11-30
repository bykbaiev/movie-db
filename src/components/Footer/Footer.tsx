import { H1 } from 'components/Title';
import styled from 'styled-components';

export const FOOTER_HEIGHT = '50px';

const Wrapper = styled(H1)`
  height: ${FOOTER_HEIGHT};
  line-height: ${FOOTER_HEIGHT};
`;

export const Footer = () => (
  <Wrapper>Footer</Wrapper>
);
