import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React from 'react';
import { ArtworkForm } from 'types/ArtworkForm';

interface ArtWorkItemForm extends ArtworkForm{
  id:string;
}

const DUMMY_ART_WOORK_LIST:ArtWorkItemForm[] = [
  {
    id:'1',
    image: '',
    title: '콰야 녹아내리는 고드름',
    tags: ['',''],
    year: '',
    material: '',
    size: '',
    price:'2,800,000',
    status: '',
    statusDetail:'',
    certificate: '',
  }
]

export default function Auction() {
  return (
    <Layout>
      <AuctionNavigate />
      {DUMMY_ART_WOORK_LIST.map(artWork=><></>)}

      


      <Tab />
    </Layout>
  );
}
