import { Spinner } from '@chakra-ui/spinner';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { SearchQuery, SearchResults } from 'recoil/SearchResults'; 
import { RecoilObserver } from 'utils';

import { Search } from './Search';

const renderSearch = (onQueryChange, onResultsChange) => {
  render(
    <RecoilRoot>
      <Suspense fallback={<Spinner />}>
        <RecoilObserver node={SearchQuery} onChange={onQueryChange} />
        <RecoilObserver node={SearchResults} onChange={onResultsChange} />
        <Search /> 
      </Suspense>
    </RecoilRoot>
  );
};

const identity = x => x;

const getResults = () => screen.getByTestId('search-results');

describe('#Search', () => {
  test('the state should change on search query change', async () => {
    const onChange = jest.fn();
    renderSearch(onChange, identity);

    const searchBox = await screen.findByRole('search');
    fireEvent.change(searchBox, { target: { value: 'query' } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('query');
    expect(searchBox).toBeInTheDocument();

    await waitFor(() => {});
  });

  test('the dropdown for search results should be rendered when the query is non empty', async () => {
    const onQueryChange = jest.fn();
    const onResultsChange = jest.fn();
    renderSearch(onQueryChange, onResultsChange);

    const searchBox = await screen.findByRole('search');
    fireEvent.change(searchBox, { target: { value: 'query' } });

    expect(await getResults()).toBeInTheDocument();

    await waitFor(() => {});
  });
});

