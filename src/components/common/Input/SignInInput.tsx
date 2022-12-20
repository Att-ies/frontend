import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
}

const TYPELIST = {
  name: { type: 'text', content: '이름을 입력해주세요.' },
  address: { type: 'text', content: '주소를 입력해주세요.' },
  email: { type: 'text', content: 'id@naver.com' },
  pw: { type: 'password', content: '영문+숫자 조합 8자리 이상 입력해주세요.' },
  number: { type: 'text', content: '예) 010-1234-5678' },
};

export default function SignInInput({ type }: InputProps) {
  return (
    <input
      type={TYPELIST[type]?.type}
      placeholder={TYPELIST[type]?.content}
      className="w-[312px] text-[#D8D8D8] text-[12px] rounded-[8px] border-[#D8D8D8]"
    />
  );
}
