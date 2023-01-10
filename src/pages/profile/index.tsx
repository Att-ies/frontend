import authApi from '@apis/auth/authApi';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Tab from '@components/common/Tab';
import Activity from '@components/mypage/Activity';
import SettingItem from '@components/mypage/SettingItem';
import ArtItem from '@components/profile/ArtItem';
import arrow from '@public/svg/icons/icon_arrow_black.svg';
import notification from '@public/svg/icons/icon_notification.svg';
import plus from '@public/svg/icons/icon_plus_pink.svg';
import setting from '@public/svg/icons/icon_setting.svg';
import user from '@public/svg/icons/icon_user.svg';
import usergray from '@public/svg/icons/icon_user_gray.svg';
import { getToken } from '@utils/localStorage/token';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

interface defaultProps {
  [key: string]: any;
}

const WelcomeBox = tw.div<defaultProps>`
bg-[#F5535D] rounded-lg h-[90px] flex justify-between items-center px-4
`;

interface ActivityListForm {
  id: string;
  text: string;
  icon: string;
  path: string;
}

const ActivityLists: ActivityListForm[] = [
  {
    id: '1',
    text: '관심목록',
    icon: '/svg/icons/icon_heart.svg',
    path: '/profile/wish',
  },
  {
    id: '2',
    text: '나의 픽 작가',
    icon: '/svg/icons/icon_book.svg',
    path: '/profile/pick',
  },
  {
    id: '3',
    text: '진행 경매',
    icon: '/svg/icons/icon_dollar.svg',
    path: '/auction',
  },
];

interface SettingListForm {
  id: string;
  text: string;
  path: string;
}
const SettingLists: SettingListForm[] = [
  {
    id: '1',
    text: '개인/보안',
    path: '/profile/security',
  },
  {
    id: '2',
    text: '1:1문의',
    path: '/inquiry',
  },
  {
    id: '3',
    text: '구매/판매내역',
    path: '/profile/history',
  },
  {
    id: '4',
    text: '로그아웃',
    path: '/profile/logout',
  },
];

interface ArtListForm {
  image: string;
  title: string;
  state: string;
}

const DUMP_ARTLIST: ArtListForm[] = [
  { image: '', title: '퓨처리즘 자연과 공생하는 미래', state: '입찰중' },
  { image: '', title: '퓨처리즘 자연과 공생하는 미래', state: '입찰중' },
  { image: '', title: '퓨처리즘 자연과 공생하는 미래', state: '입찰중' },
];

export default function Profile() {
  const [artList, setArtList] = useState<ArtListForm[]>(DUMP_ARTLIST);
  const [role, setRole] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const router = useRouter();
  const handleRightButton = () => {
    router.push('/notice');
  };

  const handleTaste = () => {
    router.push('/auth/user/join02');
  };
  const handleSetting = () => {
    router.push('/profile/security');
  };
  const handleArt = () => {
    // 작품목록 전체보기 이동
    router.push('/');
  };
  const handleAddProfile = () => {
    router.push('/profile/edit');
  };

  const getProfile = async () => {
    const response = await authApi.getUserProfile();
    console.log(response);
    if (response?.status === 200) {
      setNickname(response?.data.nickname);
      // setKeywords(response.data.keywords)
    }
  };

  useEffect(() => {
    const token = getToken();
    const role = token.role;
    getProfile();
    if (role === 'ROLE_USER') {
      // 취향 목록 불러오기 API
    } else {
      // 취향 목록 & 작품 목록 불러오기 API
    }
  }, [artList]);

  return (
    <Layout>
      <Navigate
        left_message=" "
        message="프로필"
        right_message={<Image src={notification} alt="notification" />}
        handleRightButton={handleRightButton}
      />
      <section>
        <WelcomeBox>
          <div className="w-[54px] h-[54px] rounded-full bg-[#EDEDED] flex items-center">
            <Image
              src={usergray}
              alt="user"
              width={12}
              height={12}
              className="w-[27px] h-[27px] m-auto rounded-full bg-[#EDEDED]"
            />
          </div>
          <div className="flex flex-col text-[#FFFFFF] mr-3">
            <span className="font-medium">{nickname}님,</span>
            <span className="text-xs">아띠즈에 오신 걸 환영합니다.</span>
          </div>
          <div className="mr-3">
            <Image
              src={setting}
              alt="setting"
              className="cursor-pointer"
              onClick={handleSetting}
            />
          </div>
        </WelcomeBox>
        {role === 'ROLE_ARTIST' && (
          <div
            onClick={handleAddProfile}
            className="flex justify-between border-[1px] rounded border-[#F5535D] p-4 cursor-pointer mt-4"
          >
            <div className="flex">
              <Image src={user} alt="avatar" />
              <span className="text-14 leading-6 ml-3">
                작가 프로필 추가하기
              </span>
            </div>
            <Image src={arrow} alt="arrow" />
          </div>
        )}
      </section>
      <section className="flex justify-between">
        {ActivityLists.map((activity: ActivityListForm) => (
          <Activity
            key={activity.id}
            text={activity.text}
            icon={activity.icon}
            path={activity.path}
          ></Activity>
        ))}
      </section>
      {role === 'ROLE_ARTIST' && (
        <section>
          <div className="my-4 flex justify-between border-t-[12px] border-[#F8F8FA] pt-4">
            <span className="text-14 text-[#191919] font-bold">작품 목록</span>
            <span
              onClick={handleArt}
              className="text-14 text-[#767676] font-semibold cursor-pointer"
            >
              전체보기
            </span>
          </div>
          {artList.map((art, idx) => (
            <div className="flex items-center pb-5 last:pb-0" key={idx}>
              <ArtItem art={art} />
            </div>
          ))}
        </section>
      )}
      <section className="my-8 border-y-[12px] border-[#F8F8FA]">
        <div className="my-4">
          <span className="text-14 text-[#191919] font-bold">취향 목록</span>
        </div>
        {keywords.length === 0 ? (
          <div className="mt-6 text-center mb-12 flex justify-center">
            <button
              onClick={handleTaste}
              className="w-[100px] h-[36px] border-[1px] border-[#F5535D] rounded-[19px] text-xs text-[#F5535D] flex items-center justify-center"
            >
              <div>
                <Image src={plus} alt="plus" />
              </div>
              <div>취향분석</div>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap mb-8">
            {keywords.map((keyword) => (
              <span
                className="border-[1px] border-[#F4F4F4] rounded-[19px] px-3 py-1 mr-2 mb-1 last:mr-0 text-14 text-[#767676] "
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </section>
      <section className="">
        {SettingLists.map((settingItem) => (
          <SettingItem
            key={settingItem.id}
            text={settingItem.text}
            path={settingItem.path}
          />
        ))}
      </section>
      <Tab />
    </Layout>
  );
}
