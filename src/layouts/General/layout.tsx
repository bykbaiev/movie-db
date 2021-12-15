import { Box } from '@chakra-ui/react';
import { Footer, FOOTER_HEIGHT } from 'components/Footer';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';

export const GeneralLayout = () => (
  <Box pos="fixed" top={0} right={0} bottom={0} left={0} bgColor="#000">
    <Box m="0 auto" w="100%" maxW="1024px">
      <Box minH={`calc(100vh - ${FOOTER_HEIGHT})`}>
        <Header />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  </Box>
);
