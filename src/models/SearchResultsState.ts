import { ErrorResponse } from './ErrorResponse';
import { Movie, MovieId } from './Movie';
import { Initial, TaggedState } from './TaggedState';

export type SearchResultsResponse = {
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
};

export type SearchResultsState =
  Initial |
  Loaded |
  Failure;

export type SearchModeState = 'all' | 'tv' | 'movies' | 'people';

export const isFailure = (data: SearchResultsState): data is Failure =>
  data.tag === 'Failure';

export const isLoaded = (data: SearchResultsState): data is Loaded =>
  data.tag === 'Loaded';
