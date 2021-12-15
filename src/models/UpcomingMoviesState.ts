import { ErrorResponse } from './ErrorResponse';
import { Movie, MovieId } from './Movie';
import { Initial, TaggedState } from './TaggedState';

export type UpcomingMoviesResponse = {
  page?: number;
  results?: Array<Movie>;
  dates?: {
    maximum?: string;
    minimum?: string;
  };
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

export type UpcomingMoviesState =
  Initial |
  Loaded |
  Failure;

export const isFailure = (data: UpcomingMoviesState): data is Failure =>
  data.tag === 'Failure';

export const isLoaded = (data: UpcomingMoviesState): data is Loaded =>
  data.tag === 'Loaded';
