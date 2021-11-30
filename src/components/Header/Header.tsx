import { Flex } from 'components/Flex';
import { Logo } from 'components/Logo';
import { H1 } from 'components/Title';
import { Menu } from 'containers/Menu';

export const Header = () => (
  <Flex justifyContent="space-between" alignItems="center">
    <H1>Header</H1>
    <Logo />
    <Menu />
  </Flex>
);

/* Logo */
/* Menu */
/* Search */
/* Watchlist */
/* Login */
