import { Box, Text } from '@chakra-ui/react';
import { COLOR, FOOTER_HEIGHT } from 'css-constants';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box height={FOOTER_HEIGHT}>
      <Text
        align="center"
        fontSize="xl"
        lineHeight="50px"
        color={COLOR.WHITE}
      >
        {year}. None of the rights reserved.
      </Text>
    </Box>
  );
};
