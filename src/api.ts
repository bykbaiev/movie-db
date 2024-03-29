import { MovieDetails, MovieId } from 'models/Movie';
import { PersonDetails } from 'models/Person';
import { PopularMoviesResponse } from 'models/PopularMoviesState';
import {
  MovieResult,
  PersonResult,
  SearchAllResponse,
  SearchMoviesResponse,
  SearchPeopleResponse,
  SearchTVResponse,
  TVShowResult
} from 'models/SearchResultsState';
import { TVShowDetails } from 'models/TVShow';
import { UpcomingMoviesResponse } from 'models/UpcomingMoviesState';

const BASE_URL = 'https://api.themoviedb.org/3/';

export const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500/`;

const CONTROLLER = {
  UPCOMING: () => 'movie/upcoming',
  POPULAR: () => 'movie/popular',
  MOVIE_DETAILS: ({ id }: Record<string, string | number>) => `movie/${id}`,
  PERSON_DETAILS: ({ id }: Record<string, string | number>) => `person/${id}`,
  TV_SHOW_DETAILS: ({ id }: Record<string, string | number>) => `tv/${id}`,
  VIDEOS: ({ id }: Record<string, string | number>) => `movie/${id}/videos`,
  SEARCH_MOVIE: () => 'search/movie',
  SEARCH_PERSON: () => 'search/person',
  SEARCH_TV: () => 'search/tv',
  SEARCH_ALL: () => 'search/multi',
} as const;

type Controller = keyof typeof CONTROLLER;

const getQuery = (config: Record<string, string>): string =>
  Object.keys(config)
    .reduce(
      (acc, key) =>
        `${acc}&${key}=${config[key]}`,
      `?api_key=${process.env.REACT_APP_TMDB_AUTH_TOKEN}`
    );

const getUrl = (controller: Controller, config: Record<string, string>, params = {}): string =>
  `${BASE_URL}${CONTROLLER[controller](params)}${getQuery(config)}`;

const fetchEntities = async <T>(controller: Controller, config: Record<string, string>, controllerParams = {}): Promise<T> => {
  try {
    const result = await fetch(getUrl(controller, config, controllerParams));
    const response = await result.json();

    return response;
  } catch (_) {
    return Promise.reject('unable to load entities, controller: ' + controller);
  }
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const result = await fetch(getUrl('MOVIE_DETAILS', { page: '1', language: 'en-US'}, { id }));
  const response = await result.json();

  return response;
};

export const fetchPersonDetails = async (id: number): Promise<PersonDetails> => {
  const result = await fetch(getUrl('PERSON_DETAILS', { page: '1', language: 'en-US' }, { id }));
  const response = await result.json();

  return response;
};

export const fetchTVShowDetails = async (id: number): Promise<TVShowDetails> => {
  const result = await fetch(getUrl('TV_SHOW_DETAILS', { page: '1', language: 'en-US' }, { id }));
  const response = await result.json();

  return response;
};

export const fetchUpcomingMovies = async (): Promise<Array<MovieId>> => {
  return fetchEntities<UpcomingMoviesResponse>('UPCOMING', { page: '1', language: 'en-US' })
    .then(data => data.results?.map(({ id }) => id) || []);
};

export const fetchPopularMovies = async (): Promise<Array<MovieId>> => {
  return fetchEntities<PopularMoviesResponse>('POPULAR', { page: '1', language: 'en-US' })
    .then(data => data.results?.map(({ id }) => id) || []);
};

export const fetchMovieVideos = async (id: number): Promise<any> => {
  const response = await fetch(getUrl('VIDEOS', { page: '1', language: 'en-US' }, { id }));

  return response;
};

export const searchMovies = async (query: string): Promise<Array<MovieResult>> => {
  return fetchEntities<SearchMoviesResponse>('SEARCH_MOVIE', { page: '1', language: 'en-US', query })
    .then(data => data.results?.map(({ id }) => <MovieResult>{ tag: 'Movie', id }) || []);
};

export const searchPeople = async (query: string): Promise<Array<PersonResult>> => {
  return fetchEntities<SearchPeopleResponse>('SEARCH_PERSON', { page: '1', language: 'en-US', query })
    .then(data => data.results?.map(({ id }) => <PersonResult>{ tag: 'Person', id }) || []);
};

export const searchTVShows = async (query: string): Promise<Array<TVShowResult>> => {
  return fetchEntities<SearchTVResponse>('SEARCH_TV', { page: '1', language: 'en-US', query })
    .then(data => data.results?.map(({ id }) => <TVShowResult>{ tag: 'TVShow', id }) || []);
};

type CommonResult = MovieResult | PersonResult | TVShowResult;

export const searchAll = async (query: string): Promise<Array<CommonResult>> => {
  return fetchEntities<SearchAllResponse>('SEARCH_ALL', { page: '1', language: 'en-US', query })
    .then(data => data.results?.map(({ id, media_type }) => {
      switch (media_type) {
        case 'movie':
          return <MovieResult>{ tag: 'Movie', id };

        case 'tv':
          return <TVShowResult>{ tag: 'TVShow', id };

        case 'person':
          return <PersonResult>{ tag: 'Person', id };

        default:
          return null;
      }
    }).filter(Boolean) as Array<CommonResult> || []);
};
