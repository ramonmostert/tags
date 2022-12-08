import styled from '@emotion/styled';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactElement | string;
  className?: string;
  color?: string;
}

const Root = styled.button(({ color }) => ({
  backgroundColor: color,
  border: 'none',
  color: '#fff'
}));

const Button = ({ onClick, children, className, color = '#d84315' }: ButtonProps): JSX.Element => {
  return <Root {...{ onClick, className, color }}>{children}</Root>;
};

export default Button;
