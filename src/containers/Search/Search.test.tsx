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
    fireEvent.change(searchBox, {
      target: { value: 'query' },
    });
    fireEvent.keyUp(searchBox);

    await waitFor(async () => expect(await screen.getByTestId('spinner')).toBeInTheDocument());

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('query');
    expect(searchBox).toBeInTheDocument();

    await waitFor(() => {});
  });

  test('for non-empty query there should be dropdown with loading/results', async () => {
    const onQueryChange = jest.fn();
    const onResultsChange = jest.fn();
    renderSearch(onQueryChange, onResultsChange);

    const searchBox = await screen.findByRole('search');

    expect(onResultsChange).toHaveBeenCalledWith({ tag: 'Initial' });

    
    fireEvent.change(searchBox, { target: { value: 'query' } });
    fireEvent.keyUp(searchBox);

    await waitFor(async () => expect(await screen.getByTestId('spinner')).toBeInTheDocument());

    await waitFor(async () => expect(await getResults()).toBeInTheDocument());
    expect(onResultsChange).toHaveBeenCalledWith({ tag: 'Loaded', ids: [1, 2, 3] });

    const movies = screen.getAllByTestId('search-result');

    expect(movies.length).toEqual(3);
    expect(movies[0].textContent).toEqual('1');
    expect(movies[1].textContent).toEqual('2');
    expect(movies[2].textContent).toEqual('3');

    await waitFor(() => {});
  });
});

