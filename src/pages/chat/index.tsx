import { createClient, subscribe } from '@apis/chat/socketConnect';
import Chatroom from '@components/chat/ChatRoom';

import None from '@components/common/None';
import Tab from '@components/common/Tab';
import useGetChatRoomList from '@hooks/queries/chat/useGetChatRoomList';
import * as StompJs from '@stomp/stompjs';
import React, { useEffect, useRef } from 'react';

export default function Chat() {
  const client: any = useRef({}) as React.MutableRefObject<StompJs.Client>;
  const { data: chatRoom, refetch: refetchChatRoomList } = useGetChatRoomList();
  const chatRoomList = chatRoom?.chatRooms || [];
  const connect = async () => {
    client.current = await createClient('/ws-connection');
    client.current.onConnect = await onConnected;
    await client.current.activate();
  };

  const onConnected = () => {
    if (chatRoomList?.length > 0) {
      chatRoomList.forEach((chatRoom) => {
        subscribe(client.current, chatRoom?.chatRoomId, subscribeCallback);
      });
    }
  };
  const subscribeCallback = () => {
    refetchChatRoomList();
  };

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [chatRoomList.length]);

  const disconnect = () => {
    if (client != null && client.current.connected) {
      client.current.deactivate();
    }
  };
  return (
    <article>
      <article>
        <section className="flex h-20 items-center text-16 font-bold">
          채팅
        </section>
        {chatRoomList?.length ? (
          <div className="absolute inset-x-0 mt-5 w-full">
            {chatRoomList.map((chatRoom: ChatRoom) => (
              <Chatroom chatRoom={chatRoom} key={chatRoom.chatRoomId} />
            ))}
          </div>
        ) : (
          <None path="chat" message="아직 채팅 목록이 없어요" />
        )}
      </article>
      <Tab />
    </article>
  );
}
