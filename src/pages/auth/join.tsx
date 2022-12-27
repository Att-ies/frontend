import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

interface joinSelectProps {
  type: string;
  label?: string;
  placeholder?: string;
  [key: string]: any;
}
const JoinAsUserTag = tw.div<joinSelectProps>`
${(p) => (p.$isUser ? 'border-[#F5535D]' : 'border-[#D8D8D8]')}
w-full pl-3 h-[52px] cursor-pointer font-medium placeholder-[#999999] text-14 rounded-[4px] flex items-center border-[1px]`;

const JoinAsAuthorTag = tw.div<joinSelectProps>`
${(p) => (p.$isAuthor ? 'border-[#F5535D]' : 'border-[#D8D8D8]')}
w-full pl-3 h-[52px] cursor-pointer font-medium placeholder-[#999999] text-14 rounded-[4px] flex items-center border-[1px]`;

function Join() {
  const [isUser, setIsUser] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };

  const handleButtonClick = () => {
    if (isUser) {
      router.push('/auth/join01');
    } else if (isAuthor) {
      router.push('/auth/author/join01');
    }
  };
  return (
    <Layout>
      <Navigate handleLeftButton={handleLeftButton} message="회원 가입" />
      <section>
        <div className="text-18 mt-8">
          <span className="text-[#F5535D] font-bold ">아띠즈</span>에 오신 것을
          <br />
          환영합니다.
        </div>
        <div className="text-14 text-[#767676] leading-tight mt-3">
          회원 가입 후 <br />
          아띠즈의 다양한 서비스를 만나보세요!
        </div>
      </section>
      <section className="mt-8 space-y-[10px]">
        <JoinAsUserTag
          $isUser={isUser}
          onClick={() => {
            setIsUser(true);
            setIsAuthor(false);
          }}
        >
          <Image
            className="mr-3"
            src="/svg/icons/icon_user.svg"
            width={20}
            height={20}
            alt="user"
          />
          회원으로 가입하기
        </JoinAsUserTag>
        <JoinAsAuthorTag
          $isAuthor={isAuthor}
          onClick={() => {
            setIsAuthor(true);
            setIsUser(false);
          }}
        >
          <Image
            className="mr-3"
            src="/svg/icons/icon_author.svg"
            width={20}
            height={20}
            alt="user"
          />
          작가로 가입하기
        </JoinAsAuthorTag>
      </section>
      <Button
        onClick={handleButtonClick}
        className="absolute bottom-[83px] w-[325px]"
        text="가입하기"
      />
    </Layout>
  );
}

export default Join;
