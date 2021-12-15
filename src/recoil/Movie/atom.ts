import { fetchMovieDetails } from 'api';
import { MovieId } from 'models/Movie';
import { Failure as MovieFailure, Loaded as MovieLoaded, MovieState } from 'models/MovieState';
import { selectorFamily } from 'recoil';

// TODO add caching for API ?
export const Movie = selectorFamily<MovieState, MovieId>({
  key: 'Movie',
  get: (id) => async () => {
    if (!id) {
      return <MovieFailure>{ tag: 'Failure' };
    }

    try {
      const details = await fetchMovieDetails(id);

      return <MovieLoaded>{
        tag: 'Loaded',
        data: details
      };
    } catch (error: unknown) {
      return <MovieFailure>{ tag: 'Failure' };
    }
  }
});
