import { Flex } from '@chakra-ui/react';
import { Logo } from 'components/Logo';
import { Menu } from 'containers/Menu';
import { Search } from 'containers/Search';
import { HEADER_BG_COLOR, HEADER_HEIGHT, MAX_WIDTH } from 'css-constants';

export const Header = () => (
  <Flex
    p='4px'
    align='center'
    h={`${HEADER_HEIGHT}px`}
    bgColor={HEADER_BG_COLOR}
  >
    <Flex
      w={MAX_WIDTH}
      m='0 auto'
      align='center'
    >
      <Logo />
      <Menu />
      <Search />
    </Flex>
  </Flex>
);
