import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the title', () => {
  render(<App />);
  const heading = screen.getByRole('heading');
  expect(heading.textContent).toBe('Your tags');
});
