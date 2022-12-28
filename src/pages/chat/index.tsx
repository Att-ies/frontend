import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Chat() {
  const [chatRoom, setChatRoom] = useState([]);
  return (
    <Layout>
      <section className="font-bold text-16">채팅</section>
      {chatRoom.length ? (
        <section></section>
      ) : (
        <section className="flex justify-center items-center h-[650px]">
          <Image
            src={'/svg/icons/icon_chat_main.svg'}
            width="150"
            height="0"
            alt="chat"
          />
        </section>
      )}

      <Tab />
    </Layout>
  );
}
