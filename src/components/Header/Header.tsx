import { Flex } from 'components/Flex';
import { Logo } from 'components/Logo';
import { Menu } from 'containers/Menu';
import { Search } from 'containers/Search';

export const Header = () => (
  <Flex justifyContent="space-between" alignItems="center">
    <Logo />
    <Menu />
    <Search />
  </Flex>
);
