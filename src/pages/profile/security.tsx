import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const selectList = [
  {
    id: '1',
    message: '비밀번호 변경',
    onClick: () => {},
  },
  {
    id: '2',
    message: '회원탈퇴',
    onClick: () => {},
  },
];

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
  return (
    <Layout>
      <Navigate isRightButton={false} handleLeftButton={onLeftButton} />
      <section>
        {selectList.map((selectItem: selectItemType) => (
          <article
            className="border-b h-[60px] flex items-center font-bold relative text-14"
            key={selectItem.id}
            onClick={selectList.onClick}
          >
            <p>{selectItem.message}</p>
            <Image
              src="/svg/icons/icon_front.svg"
              width="18"
              height="0"
              className="absolute right-0"
              alt="link"
            />
          </article>
        ))}
      </section>
    </Layout>
  );
}
