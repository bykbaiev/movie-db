import { useRecoilState } from 'recoil';
import { SearchQuery } from 'recoil/SearchResults';
import { compose, getTargetValue } from 'utils';

export const Search = () => {
  const [query, setQuery] = useRecoilState(SearchQuery);
  const onChange = compose(setQuery, getTargetValue);

  return (
    <input
      role="search"
      value={query}
      onChange={onChange}
    />
  );
};
