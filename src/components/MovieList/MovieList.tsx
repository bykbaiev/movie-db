import { Box } from '@chakra-ui/react';
import { MovieId } from 'models/Movie';
import { FC } from 'react';
import Slider, { Settings } from 'react-slick';

import { MovieSlide } from './MovieSlide';

type Props = {
  ids: Array<MovieId>;
  settings?: Settings;
};

export const MovieList: FC<Props> = ({ ids, settings }) => {
  const sliderSettings: Settings = {
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...settings
  };

  return (
    <Box maxW={850} w='100%' m='0 auto'>
      <Slider {...sliderSettings}>
        {ids.map(id => <MovieSlide id={id} key={id} />)}
      </Slider>
    </Box>
  );
};
