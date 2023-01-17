import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import Navigate from '@components/common/Navigate';
import ArtWorkItem from '@components/profile/AuctionArtItem';

export default function Buying() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate isRightButton={false} message="구매작품  " />
      <p className="text-14">
        <span className="text-[#F5535D] ">2건</span>의 구매작품이 있습니다.
      </p>
      <ArtWorkItem />
      <ArtWorkItem />
      <ArtWorkItem />
    </Layout>
  );
}
