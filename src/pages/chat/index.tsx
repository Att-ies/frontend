import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React, { useState } from 'react';
import Image from 'next/image';

const DUMP_CHATTING_ROOM_LIST = [
  {
    id: '1',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 2,
  },
  {
    id: '2',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 2,
  },
  {
    id: '3',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 2,
  },
];

export default function Chat() {
  const [chatRoomList, setChatRoomList] = useState(DUMP_CHATTING_ROOM_LIST);
  return (
    <Layout>
      <section className="font-bold text-16">채팅</section>
      {chatRoomList.length ? (
        chatRoomList.map((chatRoom) => (
          <section className="h-[64px] flex items-center relative ">
            <article>
              <Image
                src={chatRoom.profileImage}
                alt="profile"
                width="40"
                height="0"
                className="mx-1"
              />
            </article>

            <article className="flex flex-col">
              <div className="flex">
                <p>{chatRoom.name}</p>
                <p>{chatRoom.time}</p>
              </div>
              <p>{chatRoom.message}</p>
            </article>
            <article className="absolute right-0 bg-[#F5535D] w-[20px] h-[20px] flex justify-center items-center text-[#FFF] text-12 rounded-full">
              {chatRoom.notifyCnt}
            </article>
          </section>
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
