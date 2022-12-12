import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Button from './Button';
const buttonLabel = 'Click me';

const mockCallback = jest.fn();

test('renders button with label and fires click event', async () => {
  render(<Button onClick={mockCallback}>{buttonLabel}</Button>);
  const button: HTMLButtonElement = screen.getByRole('button');

  expect(button.textContent).toBe('Click me');

  userEvent.click(button);

  expect(mockCallback).toHaveBeenCalledTimes(1);
});
