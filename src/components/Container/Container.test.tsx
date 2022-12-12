import { render, screen } from '@testing-library/react';

import Container from './Container';

test('renders container with max width of 480px', async () => {
  render(<Container>container</Container>);
  const container: HTMLDivElement = screen.getByText('container');

  expect(getComputedStyle(container).maxWidth).toBe('480px');
});
