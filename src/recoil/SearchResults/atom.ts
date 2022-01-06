import { SearchResultsState } from 'models/SearchResultsState';
import { atom, selector } from 'recoil';

export const SearchResults = selector<SearchResultsState>({
  key: 'SearchResults',
  get: async ({ get }) => {
    const query = get(SearchQuery);

    if (!query) {
      return { tag: 'Initial' }
    }

    return { tag: 'Loaded', ids: [1, 2, 3] };
  }
});

export const SearchQuery = atom<string>({
  key: 'SearchQuery',
  default: '',
});
