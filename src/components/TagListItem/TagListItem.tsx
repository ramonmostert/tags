import styled from '@emotion/styled';
import { Tag } from '../../types/Tag';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
interface TagListProps extends Tag {
  onDelete: () => void;
  onChange: (id: string, value: string) => void;
}

const Root = styled.li({
  display: 'flex',
  gap: 12,
  justifyContent: 'space-between',
  paddingTop: 8,
  paddingBottom: 8
});

const StyledInput = styled(TextInput)({
  flexGrow: 1
});

const StyledButton = styled(Button)({
  flex: '0 0 100px'
});

const TagListItem = ({ id, name, onDelete, onChange }: TagListProps): JSX.Element => {
  return (
    <Root role="listitem">
      <StyledInput
        id={`tag-list-item-input-${id}}`}
        value={name}
        name={`tag-list-item-input-${id}}`}
        onChange={(e) => {
          onChange(id, e.target.value);
        }}
      />
      <StyledButton onClick={onDelete}>delete</StyledButton>
    </Root>
  );
};

export default TagListItem;
