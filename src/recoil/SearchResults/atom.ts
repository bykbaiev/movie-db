import { searchMovies } from 'api';
import { Failure, Loaded, SearchResultsState } from 'models/SearchResultsState';
import { atom, selector } from 'recoil';

export const SearchResults = selector<SearchResultsState>({
  key: 'SearchResults',
  get: async ({ get }) => {
    const query = get(SearchQuery);

    if (!query) {
      return { tag: 'Initial' };
    }

    return searchMovies(query)
      .then(ids => <Loaded>{ tag: 'Loaded', ids })
      .catch(error => <Failure>{ tag: 'Failure', error })
  }
});

export const SearchQuery = atom<string>({
  key: 'SearchQuery',
  default: '',
});
