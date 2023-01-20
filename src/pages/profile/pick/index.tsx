import Layout from '@components/common/Layout';
import React, { useState, useEffect } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import PickArtist from '@components/profile/pick/PickArtist';
import useGetPick from '@hooks/queries/useGetPick';

interface PickArtistForm {
  id: string;
  nickname: string;
  education: string;
}

interface defaultProps {
  [key: string]: any;
}

const PickContainer = tw.div<defaultProps>`
w-full flex-col divide-y-[1px] divide-[#EDEDED]
`;

export default function Pick() {
  const router = useRouter();

  const { pickList } = useGetPick();
  console.log(pickList);

  return (
    <Layout>
      <Navigate
        message="나의 픽 작가"
        isRightButton={false}
        handleLeftButton={() => {
          router.back();
        }}
      />

      <PickContainer>
        {pickList?.map((pickArtist: PickArtistForm) => (
          <PickArtist
            key={pickArtist?.id}
            id={pickArtist?.id}
            nickname={pickArtist?.nickname}
            education={pickArtist?.education}
          />
        ))}
      </PickContainer>
    </Layout>
  );
}
