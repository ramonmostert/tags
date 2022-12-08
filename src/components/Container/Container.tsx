import styled from '@emotion/styled';

interface ContainerProps {
  children: React.ReactNode;
}

const Root = styled.div({
  maxWidth: 480,
  width: '100%',
  marginLeft: 'auto',
  paddingLeft: 12,
  paddingRight: 12,
  marginRight: 'auto'
});

const Container = ({ children }: ContainerProps): JSX.Element => {
  return <Root>{children}</Root>;
};

export default Container;
