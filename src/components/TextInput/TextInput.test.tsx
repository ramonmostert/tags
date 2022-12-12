import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import TextInput from './TextInput';

test('renders input with correct name & id', async () => {
  const id = uuid();
  render(<TextInput id={id} name={id} value={'Input value'} onChange={() => {}} />);

  const textInput: HTMLInputElement = screen.getByRole('textbox');

  expect(textInput.id).toBe(id);
  expect(textInput.name).toBe(id);
});

test('renders input with value', async () => {
  const id = uuid();
  render(<TextInput id={id} name={id} value={'Input value'} onChange={() => {}} />);

  const textInput: HTMLInputElement = screen.getByRole('textbox');

  expect(textInput.value).toBe('Input value');
});

test('fires onChange event', async () => {
  const onChangeMock = jest.fn();
  const id = uuid();
  render(<TextInput id={id} name={id} value={'Input value'} onChange={onChangeMock} />);

  const textInput: HTMLInputElement = screen.getByRole('textbox');

  userEvent.clear(textInput);
  userEvent.type(textInput, 'Changed');
  expect(onChangeMock).toHaveBeenCalledTimes(8); // clear + 7 characters
});
