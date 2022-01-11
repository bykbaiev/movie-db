import { Box, Flex, Heading,Image, Text } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { MovieId } from 'models/Movie';
import { isFailure, isLoaded } from 'models/MovieState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Movie } from 'recoil/Movie';
import { getImagePath } from 'utils';

type SearchResultProps = {
  id: MovieId;
}

export const SearchResult: FC<SearchResultProps> = ({ id }) => {
  const movie = useRecoilValue(Movie(id));

  if (isFailure(movie)) {
    return <div>Oops, error</div>
  }

  const { poster_path, title, original_title, tagline } = movie.data;
  const movieTitle = title || original_title;
  const posterSrc = getImagePath(poster_path);

  return (
    <Box data-testid="search-result">
      {isLoaded(movie) && (
          <Flex>
            {posterSrc && (
              <Image
                w='48px'
                h='72px'
                objectFit='cover'
                src={posterSrc}
                alt={movieTitle}
              />
            )}
          </Flex>
        )}
        <Box>
          <Heading color={COLOR.WHITE} as='h1' size='xl'>{title}</Heading>
          <Text color={COLOR.WHITE}>{tagline}</Text>
        </Box>
    </Box>
  );
};
