import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { MovieDetails, MovieId } from 'models/Movie';
import { Failure, Loaded, MovieState } from 'models/MovieState';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Movie } from 'recoil/UpcomingMovies';
import styled from 'styled-components';
import { getImagePath } from 'utils';

type Props = {
  id: MovieId;
};

// poster_path?: string;
//   adult?: boolean;
//   overview?: string;
//   release_date?: string;
//   genre_ids?: Array<number>;
//   id?: number;
//   original_title?: string;
//   original_language?: string;
//   title?: string;
//   backdrop_path?: string;
//   popularity?: number;
//   vote_count?: number;
//   video?: boolean;
//   vote_average?: number;

const Wrapper = styled(Box)`
  height: 445px;
  background-size: cover;
`;

const isLoaded = (data: MovieState): data is Loaded =>
  data.tag === 'Loaded';

const isFailure = (data: MovieState): data is Failure =>
  data.tag === 'Failure';

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
  // eslint-disable-next-line
  const { backdrop_path, overview, id, poster_path, video, title, original_title } = movie;

  return (<Wrapper backgroundImage={getImagePath(backdrop_path)}>{title || original_title}</Wrapper>);
};
