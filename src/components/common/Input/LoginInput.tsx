import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
  inputContent: string;
}

const LogInInputTag = tw.input`
w-full border-x-0 border-t-0 text-[#AEAEAE] text-[14px] px-0
`;

export default function LoginInput({ type, inputContent }: InputProps) {
  return <LogInInputTag type={type} placeholder={inputContent} />;
}
