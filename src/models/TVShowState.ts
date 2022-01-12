import { ErrorResponse } from './ErrorResponse';
import { TaggedState } from './TaggedState';
import { TVShowDetails } from './TVShow';

export type Loaded = TaggedState<'Loaded'> & {
  data: TVShowDetails;
};

export type Failure = TaggedState<'Failure'> & {
  error: ErrorResponse;
};

export type TVShowState =
  Loaded |
  Failure;

export const isLoaded = (data: TVShowState): data is Loaded =>
  data.tag === 'Loaded';

export const isFailure = (data: TVShowState): data is Failure =>
  data.tag === 'Failure';
