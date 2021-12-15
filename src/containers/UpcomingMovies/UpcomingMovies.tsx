import { Box, Text } from '@chakra-ui/react';
import { MovieList } from 'components/MovieList';
import { COLOR } from 'css-constants';
import { isFailure,isLoaded } from 'models/UpcomingMoviesState';
import { useRecoilValue } from 'recoil';
import { UpcomingMoviesIds } from 'recoil/UpcomingMovies';

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
    <Box pt={4} m='0 auto'>
      {isLoaded(idsState) && <MovieList ids={idsState.ids} />}
    </Box>
  );
};
