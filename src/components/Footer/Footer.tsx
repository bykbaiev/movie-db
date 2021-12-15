import { Text } from '@chakra-ui/react';
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
        align="center"
        fontSize="xl">
        {year}. None of the rights reserved.
      </Text>
    </Wrapper>
  );
};
