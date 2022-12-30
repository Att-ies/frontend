import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MaainModal from '@components/main/MainModal';

interface selectItemType {
  id: string;
  message: string;
  onClick: () => void;
}

export default function security() {
  const router = useRouter();
  const onLeftButton = () => {
    router.back();
  };
  const handlePassword = () => {
    router.push('password');
  };

  const handleWithdrawal = () => {
    // Modal 띄우기
  };
  return (
    <Layout>
      <MainModal />
      <Navigate
        isRightButton={false}
        handleLeftButton={onLeftButton}
        message="개인/보완"
      />
      <section>
        <article
          className="border-b h-[60px] flex items-center font-bold relative text-14"
          onClick={handlePassword}
        >
          <p>비밀번호 변경</p>
          <Image
            src="/svg/icons/icon_front.svg"
            width="18"
            height="0"
            className="absolute right-0"
            alt="link"
          />
        </article>
        <article
          className="border-b h-[60px] flex items-center font-bold relative text-14"
          onClick={handleWithdrawal}
        >
          <p>회원 탈퇴</p>
          <Image
            src="/svg/icons/icon_front.svg"
            width="18"
            height="0"
            className="absolute right-0"
            alt="link"
          />
        </article>
      </section>
    </Layout>
  );
}
