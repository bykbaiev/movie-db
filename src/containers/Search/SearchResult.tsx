import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { MovieId } from 'models/Movie';
import { isFailure, isLoaded } from 'models/MovieState';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Movie } from 'recoil/Movie';
import { getImagePath } from 'utils';

type SearchResultProps = {
  id: MovieId;
}

export const SearchResult: FC<SearchResultProps> = ({ id }) => {
  const movie = useRecoilValue(Movie(id));
  const imgSize = { w: '48px', h: '72px' };

  if (isFailure(movie)) {
    return <div>Oops, error</div>
  }

  const { poster_path, title, original_title, tagline } = movie.data;
  const movieTitle = title || original_title;
  const posterSrc = getImagePath(poster_path);
  const bg = posterSrc ? 'transparent' : 'gray.50';

  return (
    <Link to={`/movie/${id}`}>
      <Flex p={2} data-testid='search-result' cursor='pointer' _hover={{ bg: 'gray.700' }}>
        {isLoaded(movie) && (
            <>
              <Box flex={`0 0 ${imgSize.w}`} h={imgSize.h} mr={2} bgColor={bg}>
                {posterSrc && (
                  <Image
                    w={imgSize.w}
                    h={imgSize.h}
                    mr={2}
                    objectFit='cover'
                    src={posterSrc}
                    alt={movieTitle}
                  />
                )}
              </Box>
          
              <Box>
                <Text color={COLOR.WHITE} noOfLines={1} fontSize='md' fontWeight='medium'>{title}</Text>
                <Text color='gray.50' fontSize='sm' pt={1}>{tagline}</Text>
              </Box>
            </>
          )}
      </Flex>
    </Link>
  );
};
