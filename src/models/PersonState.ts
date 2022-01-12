import { ErrorResponse } from './ErrorResponse';
import { PersonDetails } from './Person';
import { TaggedState } from './TaggedState';

export type Loaded = TaggedState<'Loaded'> & {
  data: PersonDetails;
};

export type Failure = TaggedState<'Failure'> & {
  error: ErrorResponse;
};

export type PersonState =
  Loaded |
  Failure;

export const isLoaded = (data: PersonState): data is Loaded =>
  data.tag === 'Loaded';

export const isFailure = (data: PersonState): data is Failure =>
  data.tag === 'Failure';
