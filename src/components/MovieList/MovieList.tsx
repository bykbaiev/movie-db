import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Box } from '@chakra-ui/react';
import { MovieId } from 'models/Movie';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { MovieSlide } from './MovieSlide';

type Props = {
  ids: Array<MovieId>;
};

export const MovieList: FC<Props> = ({ ids }) => {
  return (
    <Box maxW={850} w="100%" m='0 auto'>
      <Carousel
        infiniteLoop
        showIndicators={false}
        showStatus={false}
      >
        {ids.map(id => <MovieSlide id={id} key={id} />)}
      </Carousel>
    </Box>
  );
};
