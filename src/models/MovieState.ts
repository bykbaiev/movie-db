import { ErrorResponse } from './ErrorResponse';
import { MovieDetails } from './Movie';
import { TaggedState } from './TaggedState';

export type Loaded = TaggedState<'Loaded'> & {
  data: MovieDetails;
};

export type Failure = TaggedState<'Failure'> & {
  error: ErrorResponse;
};

export type MovieState =
  Loaded |
  Failure;

export const isLoaded = (data: MovieState): data is Loaded =>
  data.tag === 'Loaded';

export const isFailure = (data: MovieState): data is Failure =>
  data.tag === 'Failure';
