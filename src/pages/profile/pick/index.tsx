import Layout from '@components/common/Layout';
import React, { useState, useEffect } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import PickArtist from '@components/profile/pick/PickArtist';

interface PickArtistForm {
  id: string;
  name: string;
  information: string;
}

const DUMP_PICKARTISTLIST: PickArtistForm[] = [
  {
    id: '1',
    name: '온주',
    information: '서울예술대학교 디지털아트전공',
  },
  {
    id: '2',
    name: '아라',
    information: '홍익대학교 조형예술학과',
  },
  {
    id: '3',
    name: '람이',
    information: '계원예술대학교 융합예술과',
  },
];

interface defaultProps {
  [key: string]: any;
}

const PickContainer = tw.div<defaultProps>`
w-full flex-col divide-y-[1px] divide-[#EDEDED]
`;

export default function Pick() {
  const [pickArtistList, setPickArtistList] = useState(DUMP_PICKARTISTLIST);
  const router = useRouter();
  useEffect(() => {
    // 나의 픽 작가 LIST API
  }, []);
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
        {pickArtistList.map((pickArtist: PickArtistForm) => (
          <PickArtist
            key={pickArtist.id}
            id={pickArtist.id}
            name={pickArtist.name}
            information={pickArtist.information}
          />
        ))}
      </PickContainer>
    </Layout>
  );
}
