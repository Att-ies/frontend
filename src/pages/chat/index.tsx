import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Chatroom from '@components/chat/ChatRoom';
import { getToken } from '@utils/localStorage/token';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { useRouter } from 'next/router';
interface ChatRoomListForm {
  id: string;
  profileImage: string;
  name: string;
  time: string;
  message: string;
  notifyCnt: number;
}

const DUMP_CHAT_ROOM_LIST: ChatRoomListForm[] = [
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
  const [chatRoomList, setChatRoomList] =
    useState<ChatRoomListForm[]>(DUMP_CHAT_ROOM_LIST);

  const client = useRef({}) as React.MutableRefObject<StompJs.Client>;
  const router = useRouter();

  const connect = () => {
    const access = getToken().accessToken;
    if (!access) return;
    const headers = { Authorization: access };

    // const sock = new SockJS('http://44.193.163.114:8080/ws-connection');
    // const stomp = Stomp.over(sock);
    // stomp.connect(headers, () => {
    //   console.log('connected');
    // });

    client.current = new StompJs.Client({
      brokerURL: 'ws://44.193.163.114:8080/ws-connection',
      connectHeaders: headers,
      onStompError: (frame) => {
        console.log(frame);
      },
      onConnect: () => {
        console.log('connected');
        subscribe();
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.current.activate();
  };

  useEffect(() => {
    connect();
    () => {
      disconnect();
    };
  }, []);

  const disconnect = () => {
    client.current.deactivate();
  };

  const publish = (msg) => {
    if (!client.current.connected) {
      console.log('not connected');
      return;
    }
    client.current.publish({
      destination: '/app/send',
      body: msg,
    });
  };

  const subscribe = () => {
    if (!client.current.connected) {
      console.log('not connected');
      return;
    }
    client.current.subscribe(
      `/queue/chat-rooms/${router.query.id}`,
      (message) => {
        if (message.body) {
          console.log('Received: ' + message.body);
        } else {
          console.log('Received empty message');
        }
      },
    );
  };

  useEffect(() => {
    // 채팅방 GET API
  }, []);

  return (
    <Layout>
      <section className="font-bold text-16">채팅</section>

      {chatRoomList.length ? (
        <div className="mt-5 absolute w-full inset-x-0 ">
          {chatRoomList.map((chatRoom: ChatRoomListForm) => (
            <Chatroom chatRoom={chatRoom} key={chatRoom.id} />
          ))}
        </div>
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
