import { fetchPopularMovies } from 'api';
import { Failure, isFailure,isLoaded, Loaded, PopularMoviesState } from 'models/PopularMoviesState';
import { atom, DefaultValue } from 'recoil';

export const PopularMoviesIds = atom<PopularMoviesState>({
  key: 'PopularMoviesIds',
  default: { tag: 'Initial' },
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      setSelf(fetchPopularMovies()
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
