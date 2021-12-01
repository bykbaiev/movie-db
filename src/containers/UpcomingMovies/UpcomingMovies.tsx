import {useRecoilValue} from 'recoil';

import { MovieCard } from '../../components/MovieCard';
import { Spinner } from '../../components/Spinner';
import {Loaded,Loading,UpcomingMoviesState} from '../../models/UpcomingMoviesState';
import {UpcomingMovies} from '../../recoil/UpcomingMovies';

const isLoaded = (data: UpcomingMoviesState): data is Loaded =>
  data.tag === 'Loaded';

const isLoading = (data: UpcomingMoviesState): data is Loading =>
  data.tag === 'Loading';

export const UpcomingMoviesList = () => {
  const moviesData = useRecoilValue(UpcomingMovies);

  const loading = isLoading(moviesData);
  const movies = isLoaded(moviesData) ? moviesData?.response?.results || [] : [];

  return (
    <>
      {loading
        ? (<Spinner />)
        : (<div>{movies.map((movie, idx) => <MovieCard key={movie?.id || idx} movie={movie} />)}</div>)}
    </>
  );
};
