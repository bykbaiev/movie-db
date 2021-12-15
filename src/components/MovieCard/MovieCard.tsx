import { Box, Text } from '@chakra-ui/react';
import { COLOR } from 'css-constants';
import { Movie } from 'models/Movie';
import { FC } from 'react';

type Props = {
  movie: Movie;
};

export const MovieCard: FC<Props> = ({ movie }) => (
  <Box p={16} h={500}>
    <Text color={COLOR.WHITE}>
      {movie?.id || 'Unknown movie'}
    </Text>
  </Box>
);
