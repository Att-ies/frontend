import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import Navigate from '@components/common/Navigate';
import ChattingMessage from '@components/common/ChattingMessage';
import Image from 'next/image';
interface ChatRoomProps {
  params: any;
}

const DUMP_CHATTINGLIST = [
  {
    id: '1',
    time: '오전 10:30',
    message: '온주 작가님 안녕하세요',
    sender: 'me',
  },
  {
    id: '2',
    time: '오전 10:30',
    message: '작품 관련 문의사항이 있어 연락드렸습니다.',
    sender: 'me',
  },
  { id: '3', time: '오전 10:33', message: '네 안녕하세요!', sender: 'you' },
];

export default function ChatRoom({ params }: ChatRoomProps) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <header className="absolute top-0 inset-x-0 w-full h-[145px] bg-[#F5535D]">
        <article className="relative flex w-full mt-[70px] px-5 text-white">
          <Image
            src="/svg/icons/icon_back_white.svg"
            alt="back"
            width="11"
            height="0"
            // className=""
          />
          <div className="text-16 px-5 ">온주</div>
          <div className="text-12 flex items-center">응답시간 : 1시간 이내</div>
          <Image
            src="/svg/icons/icon_back.svg"
            alt="back"
            width="13"
            height="0"
            className="absolute right-5"
          />
        </article>
      </header>
      <section className="absolute top-[120px] inset-x-0 w-full bg-white rounded-xl p-5">
        <article className="flex items-center justify-center text-center text-[#767676] text-14 h-[40px] ">
          2022년 12월 23일
        </article>
        <article>
          {DUMP_CHATTINGLIST.map((chattingItem) => (
            <ChattingMessage key={chattingItem.id} />
          ))}
        </article>
      </section>
    </Layout>
  );
}
