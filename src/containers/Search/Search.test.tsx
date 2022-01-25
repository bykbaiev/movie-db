import { Spinner } from '@chakra-ui/spinner';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SearchQuery, SearchResults } from 'recoil/SearchResults'; 
import { RecoilObserver } from 'utils';

import { Search } from './Search';

const renderSearch = (onQueryChange, onResultsChange) => {
  render(
    <Router>
      <RecoilRoot>
        <Suspense fallback={<Spinner />}>
          <RecoilObserver node={SearchQuery} onChange={onQueryChange} />
          <RecoilObserver node={SearchResults} onChange={onResultsChange} />
          <Search /> 
        </Suspense>
      </RecoilRoot>
    </Router>
  );
};

const identity = x => x;

const emptyFn = () => {}; // eslint-disable-line

describe('#Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should load results on search query change', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve({
      json: jest.fn().mockResolvedValue(Promise.resolve({ results: [{ id: 1, media_type: 'movie' }] }))
    }) as any);
    const onChange = jest.fn();
    renderSearch(onChange, identity);

    const searchBox = await screen.findByRole('search');
    fireEvent.change(searchBox, {
      target: { value: 'non-empty' },
    });
    fireEvent.keyUp(searchBox);

    await waitFor(async () => expect(await screen.getByTestId('spinner')).toBeInTheDocument());

    await waitFor(async () => expect(await screen.getByTestId('search-results-list')).toBeInTheDocument());

    await waitFor(async () => expect(await screen.getByTestId('search-result-1')).toBeInTheDocument());

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('non-empty');
    expect(searchBox).toBeInTheDocument();

    await waitFor(emptyFn);
  });

  test('should show message on absent results', async () => {
    const onChange = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve({
      json: jest.fn().mockResolvedValue(Promise.resolve({ results: [] }))
    }) as any);
    renderSearch(onChange, identity);

    const searchBox = await screen.findByRole('search');
    fireEvent.change(searchBox, {
      target: { value: 'empty' },
    });
    fireEvent.keyUp(searchBox);

    await waitFor(async () => expect(await screen.getByTestId('spinner')).toBeInTheDocument());

    await waitFor(async () => expect(await screen.getByTestId('search-results-list')).toBeInTheDocument());

    expect(screen.getByTestId('search-results-list').textContent).toContain('There are no results');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('empty');
    expect(searchBox).toBeInTheDocument();

    await waitFor(emptyFn);
  });

  test('should show message on failure', async () => {
    const onChange = jest.fn();
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('invalid query'));
    renderSearch(onChange, identity);

    const searchBox = await screen.findByRole('search');
    fireEvent.change(searchBox, {
      target: { value: 'failure' },
    });
    fireEvent.keyUp(searchBox);

    await waitFor(async () => expect(await screen.getByTestId('spinner')).toBeInTheDocument());

    await waitFor(async () => expect(await screen.getByTestId('search-results')).toBeInTheDocument());

    expect(screen.getByTestId('search-results').textContent).toContain('Oops, error');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('failure');
    expect(searchBox).toBeInTheDocument();

    await waitFor(emptyFn);
  });
});

