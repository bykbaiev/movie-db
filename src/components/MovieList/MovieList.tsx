import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { MovieCard } from 'components/MovieCard';
import { Movie } from 'models/Movie';
import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';

type Props = {
  movies: Array<Movie>;
};

export const MovieList: FC<Props> = ({ movies }) => {
  return (
    <Carousel
      infiniteLoop
      centerMode
      showStatus={false}
    >
      {movies.map((movie, idx) => <MovieCard key={movie?.id || idx} movie={movie} />)}
    </Carousel>
  );
};
