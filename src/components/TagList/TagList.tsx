import styled from '@emotion/styled';

interface TagListProps {
  children: React.ReactElement | React.ReactElement[];
}

const Root = styled.ul({
  padding: 0
});

const TagList = ({ children }: TagListProps): JSX.Element => {
  return <Root>{children}</Root>;
};

export default TagList;
