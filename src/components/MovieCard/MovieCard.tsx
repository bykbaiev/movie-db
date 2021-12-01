import { Text } from 'components/Text';
import { Movie } from 'models/Movie';
import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  movie: Movie;
};

const Card = styled.div`
  padding: 16px;
  width: 400px;
  height: 500px;
`

export const MovieCard: FC<Props> = ({ movie }) => (
  <Card>
    <Text>
      {movie?.id || 'Unknown movie'}
    </Text>
  </Card>
);
