import { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styled from '@emotion/styled';
import { Tag } from '../../types/Tag';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

interface TagListItemProps extends Tag {
  onDelete: () => void;
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
  delay?: number;
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
  delay = 0,
  disabled = false
}: TagListItemProps): JSX.Element => {
  const elRef = useRef(null);
  const [changed, setChanged] = useState<string>('');

  useEffect(() => {
    gsap.timeline().fromTo(
      elRef.current,
      {
        overflow: 'hidden',
        opacity: 0
      },
      { opacity: 1, delay }
    );
  }, []);

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
    <Root role="listitem" ref={elRef}>
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
