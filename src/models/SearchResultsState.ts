import { ErrorResponse } from './ErrorResponse';
import { MovieId } from './Movie';
import { Initial, TaggedState } from './TaggedState';

export type SearchResultsResponse = any;

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

export const isFailure = (data: SearchResultsState): data is Failure =>
  data.tag === 'Failure';

export const isLoaded = (data: SearchResultsState): data is Loaded =>
  data.tag === 'Loaded';
