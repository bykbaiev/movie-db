import { fireEvent,render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { SearchQuery } from 'recoil/SearchResults'; 
import { RecoilObserver } from 'utils';

import { Search } from './Search';

describe('The form state should', () => {
  test('change on search query change', () => {
    const onChange = jest.fn();

    render(
      <RecoilRoot>
        <RecoilObserver node={SearchQuery} onChange={onChange} />
        <Search />
      </RecoilRoot>
    );

    const searchBox = screen.getByRole('search');
    fireEvent.change(searchBox, { target: { value: 'query' } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('query');
    expect(searchBox).toBeInTheDocument();
  });
});

