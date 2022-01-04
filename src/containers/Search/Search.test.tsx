import { fireEvent,render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { SearchQuery } from 'recoil/SearchResults'; 
import { RecoilObserver } from 'utils';

import { Search } from './Search';

const getSearchBox = (onChange) => {
  render(
    <RecoilRoot>
      <RecoilObserver node={SearchQuery} onChange={onChange} />
      <Search />
    </RecoilRoot>
  );

  return screen.getByRole('search');
};

describe('#Search', () => {
  test('the state should change on search query change', () => {
    const onChange = jest.fn();
    const searchBox = getSearchBox(onChange);
    fireEvent.change(searchBox, { target: { value: 'query' } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('');
    expect(onChange).toHaveBeenCalledWith('query');
    expect(searchBox).toBeInTheDocument();
  });
});

