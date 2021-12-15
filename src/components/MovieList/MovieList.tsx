import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { MovieId } from 'models/Movie';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { MovieSlide } from './MovieSlide';

type Props = {
  ids: Array<MovieId>;
};

export const MovieList: FC<Props> = ({ ids }) => {
  return (
    <Carousel
      infiniteLoop
      centerMode
      showStatus={false}
    >
      {ids.map(id => <MovieSlide id={id} key={id} />)}
    </Carousel>
  );
};
