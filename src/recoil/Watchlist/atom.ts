import { WatchlistState } from 'models/WatchlistState';
import { atom, DefaultValue } from 'recoil';

const PROP = 'watchlist';

export const WatchlistIds = atom<WatchlistState>({
  key: 'WatchlistIds',
  default: [],
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      const watchlist = localStorage.getItem(PROP);

      if (watchlist) {
        setSelf(JSON.parse(watchlist) || []);
      }

      onSet((value, _, isReset) => {
        if (value instanceof DefaultValue || isReset) {
          localStorage.removeItem(PROP);
        } else {
          localStorage.setItem(PROP, JSON.stringify(value));
        }
      });
    }
  ]
});
