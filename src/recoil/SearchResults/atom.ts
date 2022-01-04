import { atom } from 'recoil';

export const SearchResults = atom<any>({
  key: 'PopularMoviesIds',
  default: { tag: 'Initial' },
});

export const SearchQuery = atom<string>({
  key: 'SearchQuery',
  default: '',
});
