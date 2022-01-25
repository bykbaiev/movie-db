import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { MovieId } from 'models/Movie';
import { isFailure as isMovieFailure, isLoaded as isMovieLoaded } from 'models/MovieState';
import { PersonId } from 'models/Person';
import { isFailure as isPersonFailure, isLoaded as isPersonLoaded } from 'models/PersonState';
import { isMovie, isTVShow, SearchResult as SearchResultItem } from 'models/SearchResultsState';
import { TVShowId } from 'models/TVShow';
import { isFailure as isTVShowFailure, isLoaded as isTVShowLoaded } from 'models/TVShowState';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Movie } from 'recoil/Movie';
import { Person } from 'recoil/Person';
import { TVShow } from 'recoil/TVShow';
import { getImagePath } from 'utils';

type MovieResultProps = {
  id: MovieId;
}

const MovieResult: FC<MovieResultProps> = ({ id }) => {
  const movie = useRecoilValue(Movie(id));
  const imgSize = { w: '48px', h: '72px' };

  if (isMovieFailure(movie)) {
    return <div>Oops, error</div>
  }

  const { poster_path, title, original_title, tagline } = movie.data;
  const movieTitle = title || original_title;
  const posterSrc = getImagePath(poster_path);
  const bg = posterSrc ? 'transparent' : 'gray.50';

  return (
    <Link to={`/movie/${id}`}>
      <Flex p={2} data-testid={'search-result-' + id} cursor='pointer' _hover={{ bg: 'gray.700' }}>
        {isMovieLoaded(movie) && (
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

type TVShowResultProps = {
  id: TVShowId;
}

const TVShowResult: FC<TVShowResultProps> = ({ id }) => {
  const show = useRecoilValue(TVShow(id));
  const imgSize = { w: '48px', h: '72px' };

  if (isTVShowFailure(show)) {
    return <div>Oops, error</div>
  }

  const { poster_path, name, original_name, tagline } = show.data;
  const showName = name || original_name;
  const posterSrc = getImagePath(poster_path);
  const bg = posterSrc ? 'transparent' : 'gray.50';

  return (
    <Link to={`/tv/${id}`}>
      <Flex p={2} data-testid={'search-result-' + id} cursor='pointer' _hover={{ bg: 'gray.700' }}>
        {isTVShowLoaded(show) && (
            <>
              <Box flex={`0 0 ${imgSize.w}`} h={imgSize.h} mr={2} bgColor={bg}>
                {posterSrc && (
                  <Image
                    w={imgSize.w}
                    h={imgSize.h}
                    mr={2}
                    objectFit='cover'
                    src={posterSrc}
                    alt={showName}
                  />
                )}
              </Box>
          
              <Box>
                <Text color={COLOR.WHITE} noOfLines={1} fontSize='md' fontWeight='medium'>{showName}</Text>
                <Text color='gray.50' fontSize='sm' pt={1}>{tagline}</Text>
              </Box>
            </>
          )}
      </Flex>
    </Link>
  );
};

type PersonResultProps = {
  id: PersonId;
}

const PersonResult: FC<PersonResultProps> = ({ id }) => {
  const person = useRecoilValue(Person(id));

  if (isPersonFailure(person)) {
    return <div>Oops, error</div>
  }

  const { name, biography } = person.data;

  return (
    <Link to={`/person/${id}`}>
      <Box p={2} data-testid={'search-result-' + id} cursor='pointer' _hover={{ bg: 'gray.700' }}>
        {isPersonLoaded(person) && (
            <Box>
              <Text color={COLOR.WHITE} noOfLines={1} fontSize='md' fontWeight='medium'>{name}</Text>
              <Text color='gray.50' fontSize='sm' pt={1} noOfLines={2}>{biography}</Text>
            </Box>
          )}
      </Box>
    </Link>
  );
};

type SearchResultProps = {
  result: SearchResultItem;
}

export const SearchResult: FC<SearchResultProps> = ({ result }) => {
  if (isMovie(result)) {
    return <MovieResult id={result.id} />;
  }

  if (isTVShow(result)) {
    return <TVShowResult id={result.id} />;
  }

  return <PersonResult id={result.id} />
};
