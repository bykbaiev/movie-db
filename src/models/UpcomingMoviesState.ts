import { Movie } from './Movie';

type TaggedState<T extends string> = { tag: T };

export type Initial = TaggedState<'Initial'>;

export type Loading = TaggedState<'Loading'>;

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
  response: UpcomingMoviesResponse;
};

type UpcomingMoviesError = {
  status_message?: string;
  status_code?: number;
}

export type Failure = TaggedState<'Failure'> & {
  error: UpcomingMoviesError;
};

export type UpcomingMoviesState =
  Initial |
  Loading |
  Loaded |
  Failure;
