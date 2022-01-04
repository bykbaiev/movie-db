import { render, screen } from '@testing-library/react';

import { Header } from './Header';

test('renders Search', () => {
  render(<Header />);
  const searchBox = screen.getByRole('search');
  expect(searchBox).toBeInTheDocument();
});
