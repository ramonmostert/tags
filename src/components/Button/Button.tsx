import styled from '@emotion/styled';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactElement | string;
  className?: string;
  disabled?: boolean;
  color?: string;
}

const Root = styled.button(({ color }) => ({
  backgroundColor: color,
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  padding: '12px 8px',
  ':disabled': {
    backgroundColor: '#444'
  }
}));

const Button = ({
  onClick,
  children,
  className,
  disabled = false,
  color = '#d84315'
}: ButtonProps): JSX.Element => {
  return <Root {...{ onClick, className, color, disabled }}>{children}</Root>;
};

export default Button;
