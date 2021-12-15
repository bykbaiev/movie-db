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
