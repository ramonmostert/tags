import { render, screen } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import TagList from './TagList';
import TagListItem from '../TagListItem/TagListItem';

const items = [
  { id: uuid(), name: 'Tag 1' },
  { id: uuid(), name: 'Tag 2' }
];

test('renders list with x items', async () => {
  render(
    <TagList>
      {items.map((item) => (
        <TagListItem
          key={item.id}
          id={item.id}
          name={item.name}
          onDelete={() => {}}
          onChange={() => {}}
        />
      ))}
    </TagList>
  );
  const listItems: HTMLLIElement[] = screen.getAllByRole('listitem');

  expect(listItems.length).toBe(2);
});
