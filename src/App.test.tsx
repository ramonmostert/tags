import userEvent from '@testing-library/user-event';
import { render, screen, within, act } from '@testing-library/react';
import App from './App';

test('add a new tag', async () => {
  render(<App />);
  const input: HTMLInputElement = screen.getByPlaceholderText('Type new tag here...');
  userEvent.type(input, 'new tag');
  expect(input.value).toBe('new tag');

  const button = screen.getByRole('button', { name: 'add' });
  userEvent.click(button);

  const item = screen.getByDisplayValue('new tag');
  expect(item).toBeInstanceOf(HTMLInputElement);
});

test('remove a tag', async () => {
  render(<App />);
  const addInput: HTMLInputElement = screen.getByPlaceholderText('Type new tag here...');
  const addButton = screen.getByRole('button', { name: 'add' });
  userEvent.type(addInput, 'new tag');
  userEvent.click(addButton);

  userEvent.type(addInput, 'another tag');
  userEvent.click(addButton);

  let listItems: HTMLLIElement[] = await screen.findAllByRole('listitem');
  let listInput: HTMLInputElement = within(listItems[listItems.length - 1]).getByRole('textbox');

  expect(listInput.value).toBe('another tag');

  const removeButton = within(listItems[listItems.length - 1]).getByRole('button');

  userEvent.click(removeButton);

  listItems = await screen.findAllByRole('listitem');
  listInput = within(listItems[listItems.length - 1]).getByRole('textbox');

  expect(listInput.value).not.toBe('another tag');
});

test('edit a tag', async () => {
  render(<App />);
  const addInput: HTMLInputElement = screen.getByPlaceholderText('Type new tag here...');
  const addButton = screen.getByRole('button', { name: 'add' });

  userEvent.type(addInput, 'new tag');
  userEvent.click(addButton);

  let listItems: HTMLLIElement[] = await screen.findAllByRole('listitem');
  let listInput: HTMLInputElement = within(listItems[listItems.length - 1]).getByRole('textbox');

  expect(listInput.value).toBe('new tag');

  userEvent.clear(listInput);
  userEvent.type(listInput, 'edited tag');

  listItems = screen.getAllByRole('listitem');
  listInput = within(listItems[listItems.length - 1]).getByRole('textbox');
  expect(listInput.value).toBe('edited tag');
});
