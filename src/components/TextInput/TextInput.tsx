import styled from '@emotion/styled';

interface TextInputProps {
  name: string;
  value: string;
  className?: string;
  id: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Root = styled.input({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 8,
  paddingRight: 8,
  border: 'none'
});

const TextInput = ({
  name,
  id,
  onChange,
  value,
  className,
  placeholder
}: TextInputProps): JSX.Element => {
  return <Root className={className} type="text" {...{ name, id, onChange, value, placeholder }} />;
};

export default TextInput;
