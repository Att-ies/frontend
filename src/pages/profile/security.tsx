import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from '@components/common/Modal';

export default function security() {
  const [isModal, setIsModal] = useState();
  const router = useRouter();
  const onLeftButton = () => {
    router.back();
  };
  const handlePassword = () => {
    router.push('password');
  };

  const handleWithdrawal = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };
  const handleAcceptWithdrawal = () => {
    console.log('회원 탈퇴 진행');
  };

  return (
    <Layout>
      <Modal
        isModal={isModal}
        isMain
        message="아띠즈 탈퇴시 회원님의 사용정보가 모두 삭제됩니다."
        denyMessage="탈퇴"
        onCloseModal={handleCloseModal}
        onAccept={handleAcceptWithdrawal}
      />
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
