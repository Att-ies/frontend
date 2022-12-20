import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
  labelContent: string;
  inputContent: string;
}

interface defaultProps {
  [key: string]: any;
}

const SignInInputBoxTag = tw.div<defaultProps>`
`;

const SignInLabel = tw.label`
text-[14px] leading-8
`;

const SignInInput = tw.input`
w-full h-[48px] text-[#D8D8D8] text-[12px] rounded-[8px] border-[#D8D8D8]
indent-2;
`;

export default function SignInInputBox({
  type,
  labelContent,
  inputContent,
}: InputProps) {
  return (
    <SignInInputBoxTag>
      <SignInLabel>{labelContent}</SignInLabel>
      <SignInInput type={type} placeholder={inputContent} />
    </SignInInputBoxTag>
  );
}
