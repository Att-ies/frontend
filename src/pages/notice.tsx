import Navigate from '@components/common/Navigate';
import None from '@components/common/None';
import NoticeItem from '@components/notice/NoticeItem';
import useGetNotice from '@hooks/queries/useGetNotice';
import Image from 'next/image';

export default function Notice() {
  const { data: noticeList = [] } = useGetNotice();
  return (
    <article>
      <Navigate isRightButton={false} message="알림" />

      {noticeList.length > 0 ? (
        <div>
          <h1 className="mb-2 mt-6 font-bold">활동 알림</h1>
          <ul>
            {noticeList.map((notice: Notice) => (
              <NoticeItem notice={notice} key={notice?.id} />
            ))}
          </ul>
        </div>
      ) : (
        <None path="notice" message="받은 알림이 없어요." />
      )}
    </article>
  );
}
