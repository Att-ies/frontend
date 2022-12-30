import Layout from '@components/common/Layout';
import React, { useState } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import avatar from '@public/svg/icons/profile/icon_avatar.svg';
import Image from 'next/image';
import Button from '@components/common/Button';

interface defaultProps {
  [key: string]: any;
}

const PickDetailContainer = tw.div<defaultProps>`
w-full flex items-center cursor-pointer
`;

const PickDetailProfile = tw.div<defaultProps>`
w-[60px] mr-[10px] aspect-square flex justify-center items-center rounded-full border-[1px] border-[#999999]
`;

export default function PickDetail() {
  const [pickList, setPickList] = useState([]);
  const router = useRouter();
  const handleClick = () => {
    // 채팅하러 가기
  };

  return (
    <Layout>
      <Navigate
        isRightButton={false}
        handleLeftButton={() => {
          router.back();
        }}
      />
      <PickDetailContainer>
        <PickDetailProfile>
          <Image src={avatar} alt="avatar" width={34} height={34} />
        </PickDetailProfile>
        <div className="flex flex-col">
          <span className="text-18 font-semibold">온주</span>
          <span className="text-14">서울예술대학교 디지털 전공</span>
        </div>
      </PickDetailContainer>
      <Button
        text="채팅하기"
        kind="outlined"
        onClick={handleClick}
        className="mt-8"
      />
    </Layout>
  );
}
