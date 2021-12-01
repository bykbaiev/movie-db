import { FC } from 'react';
import styled from 'styled-components';

import { Movie } from '../../models/Movie';

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
    {movie?.id || 'Unknown movie'}
  </Card>
);
