import { ErrorResponse } from './ErrorResponse';
import { Movie, MovieId } from './Movie';
import { Person, PersonId } from './Person';
import { Initial, TaggedState } from './TaggedState';
import { TVShow, TVShowId } from './TVShow';

export type SearchMoviesResponse = {
  page?: number;
  results?: Array<Movie>;
  total_pages?: number;
  total_results?: number;
};

export type SearchPeopleResponse = {
  page?: number;
  results?: Array<Person>;
  total_pages?: number;
  total_results?: number;
};

export type SearchTVResponse = {
  page?: number;
  results?: Array<TVShow>;
  total_pages?: number;
  total_results?: number;
};

export type SearchAllResponse = {
  page?: number;
  results?: Array<{ media_type: 'person' | 'tv' | 'movie' } & (Person | Movie | TVShow)>;
  total_pages?: number;
  total_results?: number;
};

export type MovieResult = TaggedState<'Movie'> & { id: MovieId };

export type PersonResult = TaggedState<'Person'> & { id: PersonId };

export type TVShowResult = TaggedState<'TVShow'> & { id: TVShowId };

export type SearchResult = MovieResult | PersonResult | TVShowResult;

export type Loaded = TaggedState<'Loaded'> & {
  results: Array<SearchResult>;
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

export const isMovie = (data: SearchResult): data is MovieResult =>
  data.tag === 'Movie';

export const isTVShow = (data: SearchResult): data is TVShowResult =>
  data.tag === 'TVShow';
