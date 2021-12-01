import { MovieList } from 'components/MovieList/MovieList';
import { Spinner } from 'components/Spinner';
import { Loaded, Loading, UpcomingMoviesState } from 'models/UpcomingMoviesState';
import { useRecoilValue } from 'recoil';
import { UpcomingMovies } from 'recoil/UpcomingMovies';

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
        : (<MovieList movies={movies} />)}
    </>
  );
};
