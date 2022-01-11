import { Container, Text } from '@chakra-ui/layout';
import { Spinner } from 'components/Spinner';
import { COLOR, HEADER_HEIGHT, SEARCH_RESULTS_COLOR } from 'css-constants';
import { isFailure,isLoaded } from 'models/SearchResultsState';
import { Suspense, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchQuery, SearchResults } from 'recoil/SearchResults';
import { compose, debounce, getTargetValue } from 'utils';

import { SearchResult } from './SearchResult';

const RESULTS_COUNT = 5;

const Results = () => {
  const searchResults = useRecoilValue(SearchResults);
  const top = `${HEADER_HEIGHT}px`;

  if (isFailure(searchResults)) {
    return <div>Oops, error</div>
  }

  if (!isLoaded(searchResults)) {
    return null;
  }

  return (
    <Container
      data-testid="search-results"
      position="absolute"
      top={top}
      bgColor={SEARCH_RESULTS_COLOR}
      zIndex={1}
    >
      {searchResults.ids.length === 0 && <Text color={COLOR.WHITE}>There are no results</Text>}
      {searchResults.ids
        .slice(0, RESULTS_COUNT)
        .map(id => <SearchResult key={id} id={id} />)}
    </Container>
  );
};

export const Search = () => {
  const [value, setValue] = useState('');
  const setQuery = useSetRecoilState(SearchQuery);
  const onChange = compose(setValue, getTargetValue);
  const onKeyUp = useMemo(() => debounce(setQuery, 500), [setQuery]);

  return (
    <Container>
      <input
        role="search"
        value={value}
        onChange={onChange}
        onKeyUp={() => onKeyUp(value)}
      />
      <Suspense fallback={<Spinner />}>
        <Results />
      </Suspense>
    </Container>
  );
};
