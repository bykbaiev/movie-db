import { SearchResultsState } from 'models/SearchResultsState';
import { atom, selector } from 'recoil';

export const SearchResults = selector<SearchResultsState>({
  key: 'SearchResults',
  get: async ({ get }) => {
    const query = get(SearchQuery);

    if (!query) {
      return { tag: 'Initial' };
    }

    const request = () => new Promise<SearchResultsState>((resolve) => setTimeout(() => resolve({ tag: 'Loaded', ids: [1, 2, 3] }), 1000));
    const result = await request();

    return result;
  }
});

export const SearchQuery = atom<string>({
  key: 'SearchQuery',
  default: '',
});
