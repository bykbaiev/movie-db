import { fetchMovieDetails, fetchUpcomingMovies } from 'api';
import { MovieId } from 'models/Movie';
import { Failure as MovieFailure, Loaded as MovieLoaded, MovieState } from 'models/MovieState';
import { Failure, Loaded, UpcomingMoviesState } from 'models/UpcomingMoviesState';
import { atom, DefaultValue, selectorFamily } from 'recoil';

const isFailure = (data: UpcomingMoviesState): data is Failure =>
  data.tag === 'Failure';

const isLoaded = (data: UpcomingMoviesState): data is Loaded =>
  data.tag === 'Loaded';

export const UpcomingMoviesIds = atom<UpcomingMoviesState>({
  key: 'UpcomingMoviesIds',
  default: { tag: 'Initial' },
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      setSelf(fetchUpcomingMovies()
        .then(ids => <Loaded>{ tag: 'Loaded', ids })
        .catch(error => <Failure>{ tag: 'Failure', error }));

      onSet((value, oldValue) => {
        if (isFailure(value) && !value.ids && !(oldValue instanceof DefaultValue) && isLoaded(oldValue)) {
          setSelf(<Failure>{ tag: 'Failure', ids: oldValue.ids });
        }
      })
    }
  ]
});

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
