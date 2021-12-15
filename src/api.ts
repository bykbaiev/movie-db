import { MovieDetails, MovieId } from 'models/Movie';
import { PopularMoviesResponse } from 'models/PopularMoviesState';
import { UpcomingMoviesResponse } from 'models/UpcomingMoviesState';

const BASE_URL = 'https://api.themoviedb.org/3/';

export const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500/`;

const CONTROLLER = {
  UPCOMING: () => 'movie/upcoming',
  POPULAR: () => 'movie/popular',
  MOVIE_DETAILS: ({ id }: Record<string, string | number>) => `movie/${id}`,
  VIDEOS: ({ id }: Record<string, string | number>) => `movie/${id}/videos`
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

const fetchMovies = async <T>(controller: Controller, config: Record<string, string>, controllerParams = {}): Promise<T> => {
  const result = await fetch(getUrl(controller, config, controllerParams));
  const response = await result.json();

  return response;
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const result = await fetch(getUrl('MOVIE_DETAILS', { page: '1', language: 'en-US'}, { id }));
  const response = await result.json();

  return response;
};

export const fetchUpcomingMovies = async (): Promise<Array<MovieId>> => {
  return fetchMovies<UpcomingMoviesResponse>('UPCOMING', { page: '1', language: 'en-US' })
    .then(data => data.results?.map(({ id }) => id) || []);
};

export const fetchPopularMovies = async (): Promise<Array<MovieId>> => {
  return fetchMovies<PopularMoviesResponse>('POPULAR', { page: '1', language: 'en-US' })
    .then(data => data.results?.map(({ id }) => id) || []);
};

export const fetchMovieVideos = async (id: number): Promise<any> => {
  const response = await fetch(getUrl('VIDEOS', { page: '1', language: 'en-US' }, { id }));

  return response;
};
