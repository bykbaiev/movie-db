import { fetchUpcomingMovies } from 'api';
import { Failure, isFailure,isLoaded, Loaded, UpcomingMoviesState } from 'models/UpcomingMoviesState';
import { atom, DefaultValue } from 'recoil';

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
