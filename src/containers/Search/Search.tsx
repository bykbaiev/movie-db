import { Container, Flex } from '@chakra-ui/layout';
import { Spinner } from 'components/Spinner';
import { isFailure,isLoaded } from 'models/SearchResultsState';
import { Suspense, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchQuery, SearchResults } from 'recoil/SearchResults';
import { compose, debounce, getTargetValue } from 'utils';

const Results = () => {
  const searchResults = useRecoilValue(SearchResults);

  if (isFailure(searchResults)) {
    return <div>Oops, error</div>
  }

  if (!isLoaded(searchResults)) {
    return null;
  }

  return (
    <Flex data-testid="search-results">
      {searchResults.ids.map(id => <div data-testid="search-result" key={id}>{id}</div>)}
    </Flex>
  );
};

export const Search = () => {
  const [value, setValue] = useState('');
  const setQuery = useSetRecoilState(SearchQuery);
  const onChange = compose(setValue, getTargetValue);
  const onKeyUp = debounce(setQuery, 300);

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
