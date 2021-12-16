import { Box, Text } from '@chakra-ui/react';
import { COLOR, HEADER_HEIGHT } from 'css-constants';

export const Header = () => (
  <Box p='4px' h={`${HEADER_HEIGHT}px`}>
    <Text color={COLOR.WHITE}>HEADER</Text>
  </Box>
  // <Flex
  //   p='4px'
  //   align='center'
  //   h={`${HEADER_HEIGHT}px`}
  //   bgColor={HEADER_BG_COLOR}
  // >
  //   <Flex
  //     w={MAX_WIDTH}
  //     m='0 auto'
  //     align='center'
  //   >
  //     <Logo />
  //     <Menu />
  //     <Search />
  //   </Flex>
  // </Flex>
);
