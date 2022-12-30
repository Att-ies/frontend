import Layout from '@components/common/Layout';
import React, { useState } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import PickArtist from '@components/profile/pick/PickArtist';

interface defaultProps {
  [key: string]: any;
}

const PickContainer = tw.div<defaultProps>`
w-full flex-col divide-y-[1px] divide-[#EDEDED]
`;

export default function Wish() {
  const [pickList, setPickList] = useState([]);
  const router = useRouter();
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
        <PickArtist />
        <PickArtist />
        <PickArtist />
      </PickContainer>
    </Layout>
  );
}
