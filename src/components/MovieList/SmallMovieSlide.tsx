import { MinusIcon, SmallAddIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { MovieDetails, MovieId } from "models/Movie";
import { isFailure, isLoaded } from 'models/MovieState';
import { FC, useMemo } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Movie } from 'recoil/Movie';
import { WatchlistIds } from 'recoil/Watchlist/atom';
import { getImagePath } from 'utils';

type Props = {
  id: MovieId;
};

const SLIDE_HEIGHT = 475;
const SLIDE_WIDTH = 165;

const Wrapper: FC = ({ children }) => (
  <Box
    h={SLIDE_HEIGHT}
    w={SLIDE_WIDTH}
    mx={2}
    pos='relative'
  >
    {children}
  </Box>
);

export const SmallMovieSlide: FC<Props> = ({ id }) => {
  const movie = useRecoilValue(Movie(id));
  const [watchlist, setWatchlist] = useRecoilState(WatchlistIds);

  const addToWatchlist = () => {
    setWatchlist((ids) => [...ids, id]);
  };

  const removeFromWatchlist = () => {
    setWatchlist((ids) => ids.filter(movieId => movieId !== id));
  };

  const isInWatchlist = useMemo(() => {
    return watchlist.some(movieId => movieId === id);
  }, [id, watchlist]);

  return (
    <>
      {isLoaded(movie) && (
        <Slide
          isInWatchlist={isInWatchlist}
          movie={movie.data}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
      )}

      {isFailure(movie) && (
        <Wrapper>
          <Text>There is something wrong!</Text>
        </Wrapper>
      )}
    </>
  );
};

type SlideProps = {
  movie: MovieDetails;
  isInWatchlist: boolean;
  addToWatchlist: () => void;
  removeFromWatchlist: () => void;
}

const Slide: FC<SlideProps> = ({ movie, isInWatchlist, addToWatchlist, removeFromWatchlist }) => {
  const { id, poster_path, title, original_title, vote_average } = movie;
  const movieTitle = title || original_title;
  const posterSrc = getImagePath(poster_path);
  const cls = `slide-${id}`;

  return (
    <Wrapper>
      {posterSrc && (
        <Box w='100%'>
          <Image
            w='100%'
            objectFit='cover'
            src={posterSrc}
            alt={movieTitle}
          />
        </Box>
      )}
      <Box p={2} bg='rgb(25, 25, 25)'>
        {vote_average && (
          <HStack w='100%' direction='row' align='center'>
            <StarIcon boxSize="12px" color={COLOR.YELLOW} />
            <Text ml={1} color={COLOR.WHITE}>{vote_average}</Text>
            <IconButton
              className={cls}
              boxSize={8}
              ml={4}
              variant='outline'
              aria-label="Vote for the movie"
              border='none'
              _hover={{
                backgroundColor: 'gray.700'
              }}
              onClick={() => console.log('VOTE FOR THE MOVIE', id)}
              icon={<StarIcon boxSize="12px" color={COLOR.BLUE} sx={{
                [`.${cls}:hover &`]: {
                  color: COLOR.WHITE,
                },
              }} />} />
          </HStack>
        )}
        <Text align='left' h='50px' mb={1} noOfLines={2} color={COLOR.WHITE}>{movieTitle}</Text>
        <WatchlistButton
          isInWatchlist={isInWatchlist}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
        <Flex mt={1} justify='center'>
          <Button
            size='sm'
            variant='ghost'
            _hover={{ bg: 'gray.700' }}
            onClick={() => console.log('WATCH THE TRAILER', id)}
            leftIcon={<ViewIcon color={COLOR.WHITE} />}
          >
            <Text color={COLOR.WHITE}>
              Trailer
            </Text>
          </Button>
        </Flex>
      </Box>
    </Wrapper>
  );
};

type WatchlistButtonProps = {
  isInWatchlist: boolean;
  addToWatchlist: () => void;
  removeFromWatchlist: () => void;
};

const WatchlistButton: FC<WatchlistButtonProps> = ({ isInWatchlist, addToWatchlist, removeFromWatchlist }) => {
  const onClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist();
    } else {
      addToWatchlist();
    }
  };

  const Icon = isInWatchlist
    ? <MinusIcon color={COLOR.BLUE} />
    : <SmallAddIcon color={COLOR.BLUE} />;

  const color = isInWatchlist ? 'red.800' : 'gray.800';
  const hoverColor = isInWatchlist ? 'red.700' : 'gray.700';

  return (
    <Button
      size='sm'
      w='100%'
      bg={color}
      _hover={{ bg: hoverColor }}
      onClick={onClick}
      leftIcon={Icon}
    >
      <Text color={COLOR.BLUE}>
        Watchlist
      </Text>
    </Button>
  );
};
