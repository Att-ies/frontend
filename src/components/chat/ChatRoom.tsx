import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface chatRoomProps {
  chatRoom: {
    id: string;
    profileImage: string;
    name: string;
    time: string;
    message: string;
    notifyCnt: number;
  };
  [key: string]: any;
}

export default function Chatroom({ chatRoom }: chatRoomProps) {
  const handleChattingRoom = () => {
    router.push(chatRoom.id);
  };
  const router = useRouter();
  return (
    <section
      className="h-[64px] flex items-center relative border-b "
      onClick={handleChattingRoom}
    >
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
          <p className="text-[#191919] text-14 flex items-center justify-center font-bold px-2">
            {chatRoom.name}
          </p>
          <p className="text-[#767676] text-12 flex items-center justify-center">
            {chatRoom.time}
          </p>
        </div>
        <p className="text-[#191919] text-12 flex items-center justify-center px-2">
          {chatRoom.message}
        </p>
      </article>
      {!!chatRoom.notifyCnt && (
        <article className="absolute right-0 bg-[#F5535D] w-[20px] h-[20px] flex justify-center items-center text-[#FFF] text-12 rounded-full">
          {chatRoom.notifyCnt}
        </article>
      )}
    </section>
  );
}
