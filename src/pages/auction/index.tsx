import ArtWorkItem from '@components/auction/ArtWorkItem';
import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React from 'react';
import { ArtworkForm } from 'types/ArtworkForm';
import tw from 'tailwind-styled-components';

interface ArtWorkItemForm extends ArtworkForm {
  id: string;
}

const DUMMY_ART_WOORK_LIST: ArtWorkItemForm[] = [
  {
    id: '1',
    image: '',
    title: '콰야 녹아내리는 고드름',
    tags: ['', ''],
    year: '2021',
    material: 'Oil On Canvas',
    size: '72.2x61.0cm (20) ',
    price: '2,800,000',
    status: '최고낙찰가',
    statusDetail: '',
    certificate: '',
  },
  {
    id: '2',
    image: '',
    title: '콰야 녹아내리는 고드름',
    tags: ['', ''],
    year: '2021',
    material: 'Oil On Canvas',
    size: '72.2x61.0cm (20) ',
    price: '2,800,000',
    status: '최고낙찰가',
    statusDetail: '',
    certificate: '',
  },
  {
    id: '3',
    image: '',
    title: '콰야 녹아내리는 고드름',
    tags: ['', ''],
    year: '2021',
    material: 'Oil On Canvas',
    size: '72.2x61.0cm (20) ',
    price: '2,800,000',
    status: '최고낙찰가',
    statusDetail: '',
    certificate: '',
  },
];

const ArtistItemList = tw.div`

`;

export default function Auction() {
  return (
    <>
      <Layout>
        <AuctionNavigate />
        <ArtistItemList>
          {DUMMY_ART_WOORK_LIST.map((artWork) => (
            <ArtWorkItem key={artWork.id} />
          ))}
        </ArtistItemList>
      </Layout>
      <Tab />
    </>
  );
}
