import { Box, Text } from '@chakra-ui/react';
import { MovieList } from 'components/MovieList';
import { SectionHeading } from 'components/SectionHeading';
import { COLOR } from 'css-constants';
import { isFailure,isLoaded, PopularMoviesState } from 'models/PopularMoviesState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { PopularMoviesIds } from 'recoil/PopularMovies';

export const PopularMoviesList = () => {
  const idsState: PopularMoviesState = useRecoilValue(PopularMoviesIds);

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
      <SectionHeading title='Fan Favorites' link='/popular' />
      <Text mb={4} color='gray.50'>
        This week&#39;s top TV and movies
      </Text>
      <Content idsState={idsState} />
    </Box>
  );
};

type ContentProps = {
  idsState: PopularMoviesState;
}

const Content: FC<ContentProps> = ({ idsState }) => {
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
