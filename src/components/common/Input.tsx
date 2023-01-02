import tw from 'tailwind-styled-components';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  [key: string]: any;
}

interface defaultProps {
  [key: string]: any;
}

const InputBox = tw.div<defaultProps>`
`;

const Label = tw.label<defaultProps>`
text-14 leading-8
`;

const InputTag = tw.input<InputProps>`
w-full h-[52px] placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8] appearance-none
`;

export default function Input({
  type = 'text',
  label,
  placeholder,
  register,
  ...rest
}: InputProps) {
  return (
    <InputBox className="my-1">
      <Label>{label}</Label>
      <InputTag type={type} placeholder={placeholder} {...register} {...rest} />
    </InputBox>
  );
}
