import Layout from '@components/common/Layout';
import React, { useState } from 'react';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import avatar from '@public/svg/icons/profile/icon_avatar.svg';
import Image from 'next/image';
import Button from '@components/common/Button';
import { Tab } from '@headlessui/react';
import PickArtistWork from '@components/profile/pick/PickArtistWork';

const PICKARTIST_DATA = [
  {
    id: 1,
    title: '퓨처리즘 자연과 공생하는 미래',
    status: '입찰중',
  },
  {
    id: 2,
    title: '퓨처리즘 자연과 공생하는 미래',
    status: '입찰 완료',
  },
];

interface defaultProps {
  [key: string]: any;
}

const PickDetailContainer = tw.div<defaultProps>`
w-full flex items-center cursor-pointer
`;

const PickDetailProfile = tw.div<defaultProps>`
w-[60px] mr-[10px] aspect-square flex justify-center items-center rounded-full border-[1px] border-[#999999]
`;

export default function PickDetail() {
  const [pickList, setPickList] = useState(PICKARTIST_DATA);
  const router = useRouter();
  const handleClick = () => {
    // 채팅하러 가기
  };

  return (
    <Layout>
      <Navigate
        isRightButton={false}
        handleLeftButton={() => {
          router.back();
        }}
      />
      <PickDetailContainer>
        <PickDetailProfile>
          <Image src={avatar} alt="avatar" width={34} height={34} />
        </PickDetailProfile>
        <div className="flex flex-col">
          <span className="text-18 font-semibold">온주</span>
          <span className="text-14">서울예술대학교 디지털 전공</span>
        </div>
      </PickDetailContainer>
      <Button
        text="채팅하기"
        kind="outlined"
        onClick={handleClick}
        className="mt-8 mb-5"
      />
      <Tab.Group>
        <Tab.List>
          <Tab className="w-1/2 h-[52px] font-medium text-16 ui-selected:border-b-[1.5px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b ui-not-selected:text-[#999999]">
            작가소개
          </Tab>
          <Tab className="w-1/2 h-[52px] font-medium text-16 ui-selected:border-b-[1.5px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b ui-not-selected:text-[#999999]">
            작품
          </Tab>
        </Tab.List>
        <Tab.Panels className="pt-8">
          <Tab.Panel className="space-y-8">
            <div className="text-14 space-y-3">
              <p className="font-semibold">소개</p>
              <p className="leading-5">
                자연과 공생하는 미래를 꿈꾸며, 자연의 모습을 모티브로
                작업합니다.
              </p>
            </div>
            <div className="text-14 space-y-3">
              <p className="font-semibold">이력</p>
              <p className="leading-5">2022 조형예술학과 졸업전시</p>
            </div>
            <div className="text-14">
              <p className="font-semibold">SNS</p>
              <div className="flex mt-3">
                <div className="w-1/2 flex items-center">
                  <Image
                    src="/svg/icons/icon_instagram_black.svg"
                    width={20}
                    height={20}
                    alt="instagram"
                  />
                  <p className="leading-5 ml-[6px]">ara__22</p>
                </div>
                <div className="w-1/2 flex items-center">
                  <Image
                    src="/svg/icons/icon_behance_black.svg"
                    width={20}
                    height={20}
                    alt="instagram"
                  />
                  <p className="leading-5 ml-[6px]">ara__22</p>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="space-y-6">
            {pickList.map((work) => (
              <PickArtistWork
                key={work.id}
                title={work.title}
                status={work.status}
              />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
