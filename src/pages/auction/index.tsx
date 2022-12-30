import AuctionNavigate from '@components/auction/AuctionNavigate';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React from 'react';

export default function Auction() {
  return (
    <Layout>
      <AuctionNavigate />
      <Tab />
    </Layout>
  );
}
