import { Box, Text } from '@chakra-ui/react';

export const FOOTER_HEIGHT = '50px';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box height={FOOTER_HEIGHT} lineHeight={FOOTER_HEIGHT}>
      <Text
        align="center"
        fontSize="xl">
        {year}. None of the rights reserved.
      </Text>
    </Box>
  );
};
