import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
  labelContent?: string;
  inputContent?: string;
}

interface defaultProps {
  [key: string]: any;
}

const InputBox = tw.div<defaultProps>`
`;

const Label = tw.label`
text-[14px] leading-8
`;

const InputTag = tw.input`
w-full h-[52px] text-[#999999] text-sm rounded-[4px] border-[#D8D8D8]
`;

export default function Input({
  type,
  labelContent,
  inputContent,
}: InputProps) {
  return (
    <InputBox>
      <Label>{labelContent}</Label>
      <InputTag type={type} placeholder={inputContent} />
    </InputBox>
  );
}
