import { Container } from '@chakra-ui/layout';
import { Spinner } from 'components/Spinner';
import { isFailure,isLoaded } from 'models/SearchResultsState';
import { Suspense } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SearchQuery, SearchResults } from 'recoil/SearchResults';
import { compose, getTargetValue } from 'utils';

const Results = () => {
  const searchResults = useRecoilValue(SearchResults);

  if (isFailure(searchResults)) {
    return <div>Oops, error</div>
  }

  if (!isLoaded(searchResults)) {
    return null;
  }

  return (
    <div data-testid="search-results" />
  );
};

export const Search = () => {
  const [query, setQuery] = useRecoilState(SearchQuery);
  const onChange = compose(setQuery, getTargetValue);

  return (
    <Container>
      <input
        role="search"
        value={query}
        onChange={onChange}
      />
      <Suspense fallback={<Spinner />}>
        <Results />
      </Suspense>
    </Container>
  );
};
