import { fetchUpcomingMovies } from 'api';
import { Failure, Loaded, UpcomingMoviesState } from 'models/UpcomingMoviesState';
import { atom, DefaultValue } from 'recoil';

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
