import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Tag } from '../../types/Tag';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

interface TagListItemProps extends Tag {
  onDelete: () => void;
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
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

const TagListItem = ({
  id,
  name,
  onDelete,
  onChange,
  disabled = false
}: TagListItemProps): JSX.Element => {
  const [changed, setChanged] = useState<string>('');

  const changeHandler = (): void => {
    onChange(id, changed);
    setChanged('');
  };

  const value = useMemo(() => {
    if (changed === '') {
      return name;
    }

    return changed;
  }, [changed, name]);

  return (
    <Root role="listitem">
      <StyledInput
        id={`tag-list-item-input-${id}}`}
        name={`tag-list-item-input-${id}}`}
        onChange={(e) => setChanged(e.target.value)}
        {...{ value }}
      />
      <StyledButton
        color={changed === '' ? '#d84315' : '#558b2f'}
        onClick={changed === '' ? onDelete : changeHandler}
        {...{ disabled }}>
        {changed === '' ? 'delete' : 'update'}
      </StyledButton>
    </Root>
  );
};

export default TagListItem;
