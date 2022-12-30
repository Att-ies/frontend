import Layout from '@components/common/Layout';
import React, { useState } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import WishCard from '@components/profile/wish/WishCard';
import { useRouter } from 'next/router';

interface defaultProps {
  [key: string]: any;
}

const WishContainer = tw.div<defaultProps>`
w-full grid grid-cols-2 gap-x-[15px] gap-y-[23px]
`;

export default function Wish() {
  const [wishList, setWishList] = useState([]);
  const router = useRouter();
  return (
    <Layout>
      <Navigate
        message="찜 목록"
        isRightButton={false}
        handleLeftButton={() => {
          router.back();
        }}
      />
      <WishContainer>
        {[1, 2, 3].map((_, i) => (
          <WishCard key={i} />
        ))}
      </WishContainer>
    </Layout>
  );
}
