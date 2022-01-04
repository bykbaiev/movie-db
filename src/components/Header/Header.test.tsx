import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { Header } from './Header';

test('renders Search', () => {
  render(
    <RecoilRoot>
      <Header />
    </RecoilRoot>
  );
  const searchBox = screen.getByRole('search');
  expect(searchBox).toBeInTheDocument();
});
