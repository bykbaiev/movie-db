import { fetchTVShowDetails } from 'api';
import { TVShowId } from 'models/TVShow';
import { Failure as TVShowFailure, Loaded as TVShowLoaded, TVShowState } from 'models/TVShowState';
import { selectorFamily } from 'recoil';

// TODO add caching for API ?
export const TVShow = selectorFamily<TVShowState, TVShowId>({
  key: 'TVShow',
  get: (id) => async () => {
    if (!id) {
      return <TVShowFailure>{ tag: 'Failure' };
    }

    try {
      const details = await fetchTVShowDetails(id);

      return <TVShowLoaded>{
        tag: 'Loaded',
        data: details
      };
    } catch (error: unknown) {
      return <TVShowFailure>{ tag: 'Failure' };
    }
  }
});
