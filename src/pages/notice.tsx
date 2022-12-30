import Image from 'next/image';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import NoticeItem from '@components/notice/NoticeItem';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Notice() {
  const noticeLists = [
    { text: '노니님의 작품을 관심 등록 하였습니다.', date: '어제', id: 1 },
    { text: '라미님의 작품을 관심 등록 하였습니다.', date: '어제', id: 2 },
    {
      text: '경매에 등록하신 블루밍작품이 유찰되었습니다.',
      date: '어제',
      id: 3,
    },
    { text: '라미님의 작품을 관심 등록 하였습니다.', date: '그저께', id: 4 },
  ];
  const [notice, setNotice] = useState(noticeLists);

  const onRemove = (targetId: number) => {
    const newNoticeList = notice.filter((notice) => {
      return notice.id !== targetId;
    });
    setNotice(newNoticeList);
    console.log(noticeLists);
  };
  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };
  return (
    <Layout>
      <Navigate
        handleLeftButton={handleLeftButton}
        isRightButton={false}
        message="알림"
      />
      <h1 className="mt-8 mb-6 font-bold">활동알림</h1>
      {notice.length !== 0 ? (
        <NoticeItem handler={onRemove} noticeList={notice} />
      ) : (
        <div className="w-[130px] h-[92px] mt-[200px] m-auto flex flex-col justify-center items-center">
          <Image
            src="/svg/icons/icon_lamp.svg"
            alt="lamp"
            width={54}
            height={54}
          />
          <span className="mt-[15px] text-sm text-[#999999]">
            받은 알림이 없어요.
          </span>
        </div>
      )}
    </Layout>
  );
}
