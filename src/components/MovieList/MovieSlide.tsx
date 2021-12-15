import { Box, Heading, HStack,Image, Text } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { MovieDetails, MovieId } from 'models/Movie';
import { isFailure,isLoaded } from 'models/MovieState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Movie } from 'recoil/Movie';
import { getImagePath, getReadableRuntime } from 'utils';

type Props = {
  id: MovieId;
};

const SLIDE_HEIGHT = 445;
const PREVIEW_WIDTH = 165;
const GRADIENT = `linear-gradient(
  rgba(0, 0, 0, 0.0) 0%,
  rgba(0, 0, 0, 0.0) 70%,
  rgba(0, 0, 0, 0.2) 80%,
  rgba(0, 0, 0, 0.7) 90%,
  rgba(0, 0, 0, 0.9) 95%,
  rgba(0, 0, 0, 1.0) 100%
)`;

const Wrapper: FC = ({ children }) => (
  <Box
    h={SLIDE_HEIGHT}
    mx={2}
    overflow='hidden'
    pos='relative'
    _before={{
      content: `''`,
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 1,
      top: 0,
    }}
  >
    {children}
  </Box>
);

export const MovieSlide: FC<Props> = ({ id }) => {
  const movie = useRecoilValue(Movie(id));

  return (
    <>
      {isLoaded(movie) && <Slide movie={movie.data} />}

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
}

const Slide: FC<SlideProps> = ({ movie }) => {
  const { backdrop_path, poster_path, title, original_title, runtime } = movie;
  const movieTitle = title || original_title;
  const posterSrc = getImagePath(backdrop_path);

  return (
    <Wrapper>
      {posterSrc && (
        <Box
          pos='absolute'
          top={0}
          w='100%'
          h='100%'
          _before={{
            content: `''`,
            display: 'inline-block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: GRADIENT
          }}>
          <Image
            w='100%'
            objectFit='cover'
            src={posterSrc}
            alt={movieTitle}
          />
        </Box>
      )}
      <HStack spacing={4} direction='row' align='center' pos='absolute' left={PREVIEW_WIDTH} bottom={0} zIndex={2}>
        <Heading color={COLOR.WHITE}>
          {movieTitle}
        </Heading>
        {runtime && <Text pt={1} color='gray.50'>{getReadableRuntime(runtime)}</Text>}
      </HStack>
      <Preview poster={poster_path} title={movieTitle} />
    </Wrapper>
  );
};

type PreviewProps = {
  poster: string | null | undefined;
  title: string | undefined;
}

const Preview: FC<PreviewProps> = ({ poster, title }) => {
  const posterSrc = getImagePath(poster);

  if (!posterSrc) {
    return null;
  }

  return (
    <Box w={PREVIEW_WIDTH} pos='absolute' bottom={0} left={0} zIndex={2} boxShadow='base'>
      <Image boxSize={PREVIEW_WIDTH} objectFit='contain' src={getImagePath(poster) || undefined} alt={title} />
    </Box>
  );
};
