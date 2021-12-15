import { Flex } from '@chakra-ui/react';
import { Logo } from 'components/Logo';
import { Menu } from 'containers/Menu';
import { Search } from 'containers/Search';

export const Header = () => (
  <Flex justify="space-between" align="center">
    <Logo />
    <Menu />
    <Search />
  </Flex>
);
