import { ErrorResponse } from './ErrorResponse';
import { Movie, MovieId } from './Movie';
import { Initial, TaggedState } from './TaggedState';

export type PopularMoviesResponse = {
  page?: number;
  results?: Array<Movie>;
  total_pages?: number;
  total_results?: number;
};

export type Loaded = TaggedState<'Loaded'> & {
  ids: Array<MovieId>;
};

export type Failure = TaggedState<'Failure'> & {
  error: ErrorResponse;
  ids?: Array<MovieId>;
};

export type PopularMoviesState =
  Initial |
  Loaded |
  Failure;

export const isFailure = (data: PopularMoviesState): data is Failure =>
  data.tag === 'Failure';

export const isLoaded = (data: PopularMoviesState): data is Loaded =>
  data.tag === 'Loaded';
