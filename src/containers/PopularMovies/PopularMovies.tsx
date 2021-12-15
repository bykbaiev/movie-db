import { Box, Text } from '@chakra-ui/react';
import { MultipleMovieList } from 'components/MovieList';
import { SectionHeading } from 'components/SectionHeading';
import { COLOR } from 'css-constants';
import { isFailure, isLoaded, PopularMoviesState } from 'models/PopularMoviesState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { PopularMoviesIds } from 'recoil/PopularMovies';

export const PopularMoviesList = () => {
  const idsState: PopularMoviesState = useRecoilValue(PopularMoviesIds);

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
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6
  };

  if (isFailure(idsState)) {
    const message = (<Text color={COLOR.WHITE}>Something went wrong!</Text>);
    if (idsState.ids) {
      return (
        <>
          {message}
          <MultipleMovieList
            ids={idsState.ids}
            settings={settings}
          />
        </>
      );
    } else {
      return message;
    }
  }

  return (
    <>
      {isLoaded(idsState) && <MultipleMovieList ids={idsState.ids} settings={settings} />}
    </>
  );
};
