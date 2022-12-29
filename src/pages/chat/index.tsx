import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React, { useState } from 'react';
import Image from 'next/image';
import Chatroom from '@components/chat/ChatRoom';

const DUMP_CHATTING_ROOM_LIST = [
  {
    id: '1',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 0,
  },
  {
    id: '2',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 4,
  },
  {
    id: '3',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 6,
  },
];

export default function Chat() {
  const [chatRoomList, setChatRoomList] = useState(DUMP_CHATTING_ROOM_LIST);

  return (
    <Layout>
      <section className="font-bold text-16">채팅</section>
      {chatRoomList.length ? (
        chatRoomList.map((chatRoom) => (
          <Chatroom chatRoom={chatRoom} key={chatRoom.id} />
        ))
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
