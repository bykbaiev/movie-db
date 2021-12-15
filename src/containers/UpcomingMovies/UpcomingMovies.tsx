import { Text } from '@chakra-ui/react';
import { MovieList } from 'components/MovieList';
import { COLOR } from 'css-constants';
import { Failure, Loaded, UpcomingMoviesState } from 'models/UpcomingMoviesState';
import { useRecoilValue } from 'recoil';
import { UpcomingMoviesIds } from 'recoil/UpcomingMovies';

const isLoaded = (data: UpcomingMoviesState): data is Loaded =>
  data.tag === 'Loaded';

const isFailure = (data: UpcomingMoviesState): data is Failure =>
  data.tag === 'Failure';

export const UpcomingMoviesList = () => {
  const idsState = useRecoilValue(UpcomingMoviesIds);

  if (isFailure(idsState)) {
    const message = (<Text color={COLOR.WHITE}>Something went wrong!</Text>);
    if (idsState.ids) {
      return (
        <>
          {message}
          <MovieList ids={idsState.ids} />
        </>
      );
    } else {
      return message;
    }
  }

  return (
    <>
      {isLoaded(idsState) && <MovieList ids={idsState.ids} />}
    </>
  );
};
