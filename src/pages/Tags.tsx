// import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import TextInput from '../components/TextInput/TextInput';
import TagList from '../components/TagList/TagList';
import Button from '../components/Button/Button';
import { Tag } from '../types/Tag';
import TagListItem from '../components/TagListItem/TagListItem';
import styled from '@emotion/styled';
import api from '../services/api/api';
import { useQuery } from 'react-query';

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

const StyledButton = styled(Button)({
  flex: '0 0 100px'
});

const ControlLayout = styled.div({
  marginTop: 24,
  display: 'flex',
  gap: 12
});

const TagsPage = (): JSX.Element => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>('');

  const { data } = useQuery('tags', api.list);
  useEffect(() => {
    if (data == null) return;
    setTags(data);
  }, [data]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTag(e.target.value);
  };

  const handleAdd = (): void => {
    const tag: Tag = { name: newTag, id: `${Math.random()}` };
    setTags((cur) => [...cur, tag]);
    setNewTag('');
  };

  const handleRemove = (id: string): void => {
    setTags((cur) => cur.filter((tag) => tag.id !== id));
  };

  const handleChange = (id: string, value: string): void => {
    setTags((cur) => {
      return cur.map((tag) => {
        if (tag.id === id) {
          return { ...tag, name: value };
        }

        return tag;
      });
    });
  };
  return (
    <Root>
      <Container>
        <h1>Your tags</h1>
        <TagList>
          {tags.map((tag) => (
            <TagListItem
              key={tag.id}
              {...tag}
              onChange={handleChange}
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
          <StyledButton color="#558b2f" onClick={handleAdd}>
            add
          </StyledButton>
        </ControlLayout>
      </Container>
    </Root>
  );
};

export default TagsPage;
