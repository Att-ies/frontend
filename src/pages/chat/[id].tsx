import Layout from '@components/common/Layout';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Navigate from '@components/common/Navigate';
import { useForm } from 'react-hook-form';
import ChattingMessage from '@components/common/ChattingMessage';
import Image from 'next/image';
interface ChatRoomProps {
  params: any;
}

const DUMP_CHATTINGLIST = [
  {
    id: '1',
    time: '오전 10:30',
    text: '온주 작가님 안녕하세요',
    sender: 'me',
  },
  {
    id: '2',
    time: '오전 10:30',
    text: '작품 관련 문의사항이 있어 연락드렸습니다.',
    sender: 'me',
  },
  { id: '3', time: '오전 10:33', text: '네 안녕하세요!', sender: 'you' },
  { id: '4', time: '오전 10:33', text: '반갑습니다', sender: 'you' },
  { id: '5', time: '오전 10:35', text: '반가워요', sender: 'me' },
];

interface MessageForm {
  message: string;
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const router = useRouter();
  const { id } = router.query;
  const imgRef = useRef();
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageForm>();

  const onSubmit = (form: MessageForm) => {
    console.log(form.message, image);
    // 채팅 API전송
  };

  const handleBack = () => {
    router.back();
  };
  const handleOption = () => {};
  const handleImageSelect = () => {
    setImage(imgRef.current.files[0]);
  };

  return (
    <Layout>
      <header className="absolute top-0 inset-x-0 w-full h-[145px] bg-[#F5535D]">
        <article className="relative flex w-full mt-[70px] px-5 text-white">
          <Image
            src="/svg/icons/icon_back_white.svg"
            alt="back"
            width="11"
            height="0"
            onClick={handleBack}
            className="cursor-pointer"
          />
          <div className="text-16 px-5 ">온주</div>
          <div className="text-12 flex items-center">응답시간 : 1시간 이내</div>
          <Image
            src="/svg/icons/icon_option.svg"
            alt="option"
            width="3"
            height="0"
            className="absolute right-5 cursor-pointer"
            onClick={handleOption}
          />
        </article>
      </header>
      <section className="absolute top-[120px] inset-x-0 w-full bg-white rounded-xl p-5">
        <article className="flex items-center justify-center text-center text-[#767676] text-14 h-[40px] font-bold">
          2022년 12월 23일
        </article>
        <article className="  ">
          {DUMP_CHATTINGLIST.map((chattingItem) => (
            <ChattingMessage
              key={chattingItem.id}
              time={chattingItem.time}
              text={chattingItem.text}
              sender={chattingItem.sender}
            />
          ))}
        </article>
      </section>
      <section className="absolute w-[327px] h-[50px] rounded-[24.5px] bg-[#EDEDED] bottom-[30px] flex items-center px-[20px]">
        <input
          type="text"
          className="border-none bg-[#EDEDED] w-[200px] h-[23px] placeholder:text-[#999999] text-14 font-semibold "
          placeholder="메세지를 입력해주세요."
          {...register('message', { required: true })}
        />
        <Image
          src="/svg/icons/icon_glasses.svg"
          alt="glasses"
          width="25"
          height="0"
          className="absolute right-14 cursor-pointer"
        />
        <label
          className="flex justify-center items-center"
          htmlFor="profileImage"
        >
          <Image
            src="/svg/icons/icon_picture.svg"
            alt="picture"
            width="25"
            height="0"
            className="absolute right-6 cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
          ref={imgRef}
        />
        {/* 임시버튼 */}
        <button
          type="submit"
          className="absolute right-[100px]"
          onClick={handleSubmit(onSubmit)}
        >
          제출
        </button>
      </section>
    </Layout>
  );
}
