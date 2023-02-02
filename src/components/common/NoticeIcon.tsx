import tw from 'tailwind-styled-components';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import useGetIsNotice from '@hooks/queries/useGetIsNotice';

interface NoticeIconProps {
  isSearch?: boolean;
  [key: string]: any;
}

const NoticeIconTag = tw.div<defaultProps>`
flex w-[60px] justify-between
`;

export default function NoticeIcon({
  isSearch = true,
  ...rest
}: NoticeIconProps) {
  const router = useRouter();
  const { data } = useGetIsNotice();
  const isNotice = data?.newNotification;
  return (
    <NoticeIconTag {...rest}>
      {isSearch ? (
        <Image
          alt="search"
          src="/svg/icons/icon_search.svg"
          width="22"
          height="0"
          onClick={() => {
            router.push('/search');
          }}
        />
      ) : (
        <div></div> // 정렬을 위한 빈 div 태그
      )}
      {isNotice && (
        <div className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-brand" />
      )}
      <Image
        alt="notification"
        src="/svg/icons/icon_notification.svg"
        width="22"
        height="0"
        onClick={() => {
          router.push('/notice');
        }}
      />
    </NoticeIconTag>
  );
}