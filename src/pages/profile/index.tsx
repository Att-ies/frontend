import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Activity from '@components/mypage/Activity';
import SettingItem from '@components/mypage/SettingItem';
import TasteAnalyze from '@components/mypage/TasteAnalyze';
import Tab from '@components/common/Tab';
import notification from '@public/svg/icons/icon_notification.svg';
import user from '@public/svg/icons/icon_user.svg';
import setting from '@public/svg/icons/icon_setting.svg';
import arrow from '@public/svg/icons/icon_arrow.svg';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';

interface defaultProps {
  [key: string]: any;
}

const WelcomeBox = tw.div<defaultProps>`
bg-[#F5535D] rounded-lg h-[90px] flex justify-between items-center
`;

export default function Profile() {
  const router = useRouter();
  const handleRightButton = () => {
    router.push('/notification');
  };

  const userTaste = useAppSelector((state) => state.user.tastes);

  const ActivityLists = [
    {
      text: '찜 목록',
      icon: '/svg/icons/icon_archive.svg',
      path: '/profile/wish',
    },
    {
      text: '나의 픽 작가',
      icon: '/svg/icons/icon_book.svg',
      path: '/profile/pick',
    },
    { text: '진행 경매', icon: '/svg/icons/icon_dollar.svg', path: '/auction' },
  ];

  const SettingLists = [
    {
      text: '개인/보완',
      method: () => {
        router.push('profile/security');
      },
    },
    {
      text: '구매/판매내역',
      method: () => {
        // router.push('/구매'); 구매 판매내역 페이지 이동
      },
    },
    {
      text: '로그아웃',
      method: () => {
        // 로그아웃 로직
      },
    },
  ];

  return (
    <Layout>
      <Navigate
        left_message=" "
        message="프로필"
        right_message={<Image src={notification} alt="notification" />}
        handleRightButton={handleRightButton}
      />
      <WelcomeBox>
        <div className="w-[54px] h-[54px] rounded-full bg-[#EDEDED] flex items-center ml-3">
          <Image
            src={user}
            alt={user}
            width={12}
            height={12}
            className="w-[27px] h-[27px] m-auto rounded-full bg-[#EDEDED]"
          />
        </div>
        <div className="flex flex-col text-[#FFFFFF]">
          <span className="font-medium">김영서님,</span>
          <span className="text-xs">아띠즈에 오신 걸 환영합니다.</span>
        </div>
        <div className="mr-3">
          <Image src={setting} alt="setting" />
        </div>
      </WelcomeBox>
      <section className="flex justify-between">
        {ActivityLists.map((activity) => (
          <Activity
            key={activity.text}
            text={activity.text}
            icon={activity.icon}
            path={activity.path}
          ></Activity>
        ))}
      </section>
      <section className="mt-8 border-y-[1px]">
        <div className="mt-6 flex justify-between">
          <span className="font-semibold">나의 취향분석</span>
          {userTaste.length === 0 ? (
            <button
              onClick={() => {
                // router.push('/') 취향분석 페이지 이동
              }}
            >
              <Image src={arrow} alt="arrow" />
            </button>
          ) : (
            ''
          )}
        </div>
        {userTaste.length === 0 ? (
          <div className="mt-6 text-center mb-[35px]">
            <div className="font-semibold text-sm">
              취향분석을 통해
              <br />
              나와 맞는 작품 추천을 받아보세요
            </div>
            <button
              className="w-[110px] h-[24px] border-[1px] border-[#F5535D] rounded-[15px] text-xs text-[#F5535D] mt-[23px]"
              onClick={() => {
                // router.push('/') 취향분석 페이지 이동
              }}
            >
              취향분석하기
            </button>
          </div>
        ) : (
          <TasteAnalyze />
        )}
      </section>
      <section>
        <div className="text-xs text-[#999999] mt-6 mb-5">
          <span>설정</span>
        </div>
        {SettingLists.map((e) => (
          <SettingItem key={e.text} text={e.text} handler={e.method} />
        ))}
      </section>
      <Tab />
    </Layout>
  );
}
