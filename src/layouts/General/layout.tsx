import { Box } from '@chakra-ui/react';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { BG_COLOR, FOOTER_HEIGHT, HEADER_HEIGHT, MAX_WIDTH } from 'css-constants';
import { Outlet } from 'react-router-dom';

export const GeneralLayout = () => (
  <Box
    minH='100vh'
    bgColor={BG_COLOR}
  >
    <Header />
    <Box
      m='0 auto'
      w='100%'
      maxW={MAX_WIDTH}
    >
      <Box minH={`calc(100vh - ${FOOTER_HEIGHT}px - ${HEADER_HEIGHT}px)`}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  </Box>
);
