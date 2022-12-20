import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
}

const TYPELIST = {
  id: '아이디 입력',
  pw: '비밀번호 입력',
};

export default function LoginInput({ type }: InputProps) {
  return (
    <input
      type="text"
      placeholder={TYPELIST[type]}
      className="w-[314px] border-x-0 border-t-0 text-[#AEAEAE] text-[14px]"
    />
  );
}

const InputForm = tw.input`
`;

// 요청 parameter
