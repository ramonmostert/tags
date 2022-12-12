import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import TagListItem from '../TagListItem/TagListItem';

test('renders list item with value', async () => {
  const id = uuid();
  render(<TagListItem key={id} id={id} name={'Tag 1'} onDelete={() => {}} onChange={() => {}} />);

  const textInput: HTMLInputElement = screen.getByRole('textbox');

  expect(textInput.value).toBe('Tag 1');
});

test('fires onDelete callback', async () => {
  const id = uuid();
  const onDeleteMock = jest.fn();

  render(
    <TagListItem key={id} id={id} name={'Tag 1'} onDelete={onDeleteMock} onChange={() => {}} />
  );

  const deleteButton = screen.getByText('delete');
  userEvent.click(deleteButton);

  expect(onDeleteMock).toHaveBeenCalledTimes(1);
});

test('fires onChange callback', async () => {
  const id = uuid();
  const onChangeMock = jest.fn();

  render(
    <TagListItem key={id} id={id} name={'Tag 1'} onDelete={() => {}} onChange={onChangeMock} />
  );

  const input = screen.getByRole('textbox');
  userEvent.type(input, 'changed');

  const updateButton = screen.getByText('update');
  userEvent.click(updateButton);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
