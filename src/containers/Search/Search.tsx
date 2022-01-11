import { Container, Text, useOutsideClick } from '@chakra-ui/react';
import { Spinner } from 'components/Spinner';
import { COLOR, HEADER_HEIGHT, SEARCH_RESULTS_COLOR, SEARCH_RESULTS_MIN_HEIGHT } from 'css-constants';
import { isFailure,isLoaded } from 'models/SearchResultsState';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchQuery, SearchResults } from 'recoil/SearchResults';
import { compose, debounce, getTargetValue } from 'utils';

import { SearchResult } from './SearchResult';

const RESULTS_COUNT = 5;

const ResultsWrapper = () => {
  const top = `${HEADER_HEIGHT}px`;
  const minHeight = `${SEARCH_RESULTS_MIN_HEIGHT}px`;

  return (
    <Container
      data-testid="search-results"
      position="absolute"
      top={top}
      p={0}
      bgColor={SEARCH_RESULTS_COLOR}
      minHeight={minHeight}
      zIndex={1}
    >
      <Suspense fallback={<Spinner />}>
        <Results />
      </Suspense>
    </Container>
  );
};

const Results = () => {
  const searchResults = useRecoilValue(SearchResults);

  if (isFailure(searchResults)) {
    return <div>Oops, error</div>
  }

  if (!isLoaded(searchResults)) {
    return null;
  }

  return (
    <Container p={0}>
      {searchResults.ids.length === 0 && <Text color={COLOR.WHITE}>There are no results</Text>}
      {searchResults.ids
        .slice(0, RESULTS_COUNT)
        .map(id => <SearchResult key={id} id={id} />)}
    </Container>
  );
};

export const Search = () => {
  const [value, setValue] = useState('');
  const search = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const setQuery = useSetRecoilState(SearchQuery);
  const onKeyUp = useMemo(() => debounce(setQuery, 500), [setQuery]);

  useOutsideClick({
    ref: search,
    handler: () => setIsOpened(false),
  });

  useEffect(() => {
    setIsOpened(!!value);
  }, [value]);

  const onChange = compose(setValue, getTargetValue);
  const onFocus = () => {
    setIsOpened(!!value);
  };

  return (
    <Container ref={search}>
      <input
        role="search"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={() => onKeyUp(value)}
      />
      {isOpened && <ResultsWrapper />}
    </Container>
  );
};
