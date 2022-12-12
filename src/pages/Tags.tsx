import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';
import Container from '../components/Container/Container';
import TextInput from '../components/TextInput/TextInput';
import TagList from '../components/TagList/TagList';
import Button from '../components/Button/Button';
import { Tag } from '../types/Tag';
import TagListItem from '../components/TagListItem/TagListItem';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFirebaseContext } from '../services/firebase/FirebaseContext';
const Root = styled.div({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%'
});

const StyledInput = styled(TextInput)({
  flexGrow: 1
});

const AddButton = styled(Button)({
  flex: '0 0 100px'
});

const ControlLayout = styled.div({
  marginTop: 24,
  display: 'flex',
  gap: 12
});

const TagsPage = (): JSX.Element => {
  const firebase = useFirebaseContext();

  const [newTag, setNewTag] = useState<string>('');
  const { data = [] } = useQuery('tags', () => firebase?.getTags());

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string): Promise<void> => await firebase?.deleteTag(id),
    {
      onSuccess: (newData, id) => {
        queryClient.setQueryData(
          'tags',
          data.filter((item) => item.id !== id)
        );
      }
    }
  );

  const addMutation = useMutation(
    async (newTag: Tag): Promise<Tag> => (await firebase?.setTag(newTag)) as Tag,
    {
      onSuccess: (newData) => {
        setNewTag('');
        queryClient.setQueryData('tags', [...data, newData]);
      }
    }
  );

  const updateMutation = useMutation(
    async (tag: Tag): Promise<Tag | undefined> => await firebase?.setTag(tag),
    {
      onSuccess: (newData) => {
        const newItems = [...data.filter((item) => item.id !== newData?.id), newData];

        queryClient.setQueryData('tags', newItems);
      }
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTag(e.target.value);
  };

  const handleAdd = (): void => {
    if (newTag === '') return;
    const tag: Tag = { name: newTag, id: uuid() };
    addMutation.mutate(tag);
  };

  const handleRemove = (id: string): void => {
    deleteMutation.mutate(id);
  };

  const handleChange = (id: string, name: string): void => {
    updateMutation.mutate({ id, name });
  };

  const items = data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Root>
      <Container>
        <h1>Your tags</h1>
        <TagList>
          {items.map((tag) => (
            <TagListItem
              disabled={addMutation.isLoading}
              key={tag.id}
              {...tag}
              onChange={(id, value) => handleChange(id, value)}
              onDelete={() => handleRemove(tag.id)}
            />
          ))}
        </TagList>
        <ControlLayout>
          <StyledInput
            placeholder={'Type new tag here...'}
            name="tag-input"
            id="tag-input"
            value={newTag}
            onChange={handleInputChange}
          />
          <AddButton color="#558b2f" disabled={addMutation.isLoading} onClick={handleAdd}>
            add
          </AddButton>
        </ControlLayout>
      </Container>
    </Root>
  );
};

export default TagsPage;
