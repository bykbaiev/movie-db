import { Text } from 'components/Text';
import styled from 'styled-components';

export const FOOTER_HEIGHT = '50px';

const Wrapper = styled.div`
  height: ${FOOTER_HEIGHT};
  line-height: ${FOOTER_HEIGHT};
`;

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Wrapper>
      <Text
        textAlign="center"
        fontSize="1.1rem">
        {year}. None of the rights reserved.
      </Text>
    </Wrapper>
  );
};
