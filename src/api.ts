import { UpcomingMoviesResponse,UpcomingMoviesState } from "./models/UpcomingMoviesState";

const BASE_URL = 'https://api.themoviedb.org/3/';

const CONTROLLER = {
  UPCOMING: 'movie/upcoming',
} as const;

const getQuery = (config: Record<string, string>): string =>
  Object.keys(config)
    .reduce(
      (acc, key) =>
        `${acc}&${key}=${config[key]}`,
      `?api_key=${process.env.REACT_APP_TMDB_AUTH_TOKEN}`
    );

const fetchMovies = async <T>(controller: keyof typeof CONTROLLER, config: Record<string, string>): Promise<T> => {
  const result = await fetch(BASE_URL + CONTROLLER[controller] + getQuery(config));
  const response = await result.json();

  return response;
};

export const fetchUpcomingMovies = async (): Promise<UpcomingMoviesState> => {
  const response = await fetchMovies<UpcomingMoviesResponse>('UPCOMING', {page: '1', language: 'en-US'});

  return {
    tag: 'Loaded',
    response
  };
};
