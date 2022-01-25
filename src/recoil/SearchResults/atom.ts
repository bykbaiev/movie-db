import { searchAll, searchMovies, searchPeople, searchTVShows } from 'api';
import { Failure, Loaded, SearchModeState, SearchResultsState } from 'models/SearchResultsState';
import { atom, selector } from 'recoil';

const SEARCH_HANDLER: Record<SearchModeState, (query: string) => Promise<any>> = {
  all: searchAll,
  people: searchPeople,
  movies: searchMovies,
  tv: searchTVShows,
};

export const SearchResults = selector<SearchResultsState>({
  key: 'SearchResults',
  get: async ({ get }) => {
    const query = get(SearchQuery);
    const mode = get(SearchMode);

    if (!query) {
      return { tag: 'Initial' };
    }

    const search = SEARCH_HANDLER[mode];

    return search(query)
      .then(results => <Loaded>{ tag: 'Loaded', results })
      .catch(error => <Failure>{ tag: 'Failure', error })
  }
});

export const SearchQuery = atom<string>({
  key: 'SearchQuery',
  default: '',
});

export const SearchMode = atom<SearchModeState>({
  key: 'SearchMode',
  default: 'all',
});
