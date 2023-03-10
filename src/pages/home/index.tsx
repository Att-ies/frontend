import 'swiper/css';
import 'swiper/css/pagination';

import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import AuctionItem from '@components/home/AuctionItem';
import Calendar from '@components/home/Calendar';
import ExhibitionItem from '@components/home/ExhibitionItem';
import FloatButton from '@components/home/FloatButton';
import DivisionBar from '@components/common/DivisionBar';
import ScheduleItem from '@components/home/ScheduleItem';
import useGetCustomizedArtWork from '@hooks/queries/useGetCustomizedArtWork';
import useGetProfile from '@hooks/queries/useGetProfile';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { Autoplay, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isUser } from '@utils/isUser';
import { Pagination } from 'swiper';
import KeywordBox from '@components/common/KeywordBox';
import Navigate from '@components/common/Navigate';
import NoticeIcon from '@components/common/NoticeIcon';
import useGetAuction from '@hooks/queries/auction/useGetAuction';
import useGetPastAuction from '@hooks/queries/auction/useGetPastAuction';
import { makeThreeEach } from '@utils/makeThreeEach';
import styled from 'styled-components';

const PastAuction = styled.section`
  .swiper-pagination-bullet-active {
    background-color: #fc6554;
  }
`;
const KeywordSection = styled.section`
  margin-top: 4px;
  margin-bottom: 8px;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fc6554;
    background-clip: padding-box;
    border: 6px solid transparent;
  }
`;

export default function Home() {
  const router = useRouter();
  const { data: customizedArtwork } = useGetCustomizedArtWork(1, 5) || {};
  const { data: userInfo } = useGetProfile() || {};
  const { data: auctionList } = useGetAuction() || {};
  const { data: pastAuctionList } = useGetPastAuction() || {};
  return (
    <>
      <Layout>
        <Navigate
          left_message={
            <Image
              alt="logo"
              src="/svg/icons/icon_logo.svg"
              width="90"
              height="90"
            />
          }
          handleLeftButton={() => {
            router.push('/home');
          }}
          right_message={<NoticeIcon />}
        />
        <DivisionBar className="absolute inset-x-0 m-auto -mt-1 h-[1px] max-w-[420px] bg-[#FC6554]" />
        <section className="mt-3">
          <div className="relative flex justify-between">
            {customizedArtwork?.artworks.length ? (
              <div>
                <div className="text-14 text-[#767676]">
                  {userInfo?.nickname}??? ?????????
                </div>
                <span className="text-20 font-bold">?????? ??? ????????????</span>
                <div className="absolute right-0 top-0 flex items-center justify-between">
                  <span
                    className="cursor-pointer pr-1 text-12 text-[#999999]"
                    onClick={() => {
                      router.push('/home/view');
                    }}
                  >
                    ????????????
                  </span>
                  <Image
                    src="/svg/icons/icon_arrow.svg"
                    alt="arrow"
                    width={6}
                    height={6}
                  />
                </div>
              </div>
            ) : (
              <div className="relative mt-2 flex h-[120px] w-[500px] cursor-pointer items-center">
                <Image
                  alt="keyword"
                  src="/svg/icons/bg_home_banner.svg"
                  fill
                  className="absolute"
                />
                <div
                  className="direc z-10 flex flex-col  justify-center p-5 text-[#FFFFFF]"
                  onClick={() => {
                    router.push('/profile/keyword');
                  }}
                >
                  <p className="text-16">
                    ??? ????????? ??????
                    <br /> ????????? ?????? ?????? ????????? &gt;
                  </p>
                  <p className="text-14">
                    {userInfo?.nickname}??? ????????? ??????????????? ?????? ?????????
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <KeywordSection>
          {!!customizedArtwork?.artworks.length &&
            userInfo?.keywords?.map((keyword: string, idx: number) => (
              <KeywordBox text={keyword} key={idx} className="mb-[6px]" />
            ))}
        </KeywordSection>

        <section className="mb-12 flex justify-center">
          <Swiper
            modules={[Autoplay, Navigation, Scrollbar]}
            navigation
            scrollbar={{ draggable: true }}
            slidesPerView={2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {customizedArtwork?.artworks?.map(
              (art: KeywordArtwork, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className="mr-5">
                    <ExhibitionItem
                      image={art.image}
                      education={art.education}
                      title={art.title}
                      id={art.id}
                      pick={art.pick}
                    />
                  </div>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </section>
        <section className="mb-3">
          <div className="flex flex-col">
            <span className="text-14 text-[#767676]">
              ????????? ?????? ???????????????
            </span>
            <span className="text-20 font-bold text-[#191919]">
              ????????? ?????? ?????????
            </span>
          </div>
          {auctionList && pastAuctionList && (
            <Calendar
              auctionList={auctionList}
              pastAuctionList={pastAuctionList}
            />
          )}
        </section>
        <section className="mb-12">
          {!!auctionList &&
            auctionList.reverse().map((auctionItem: AuctionList) => (
              <div key={auctionItem?.id}>
                <ScheduleItem auctionItem={auctionItem} />
              </div>
            ))}
          {!!pastAuctionList &&
            pastAuctionList
              .slice(pastAuctionList.length - 3)
              .reverse()
              .map((auctionItem: AuctionList) => (
                <div key={auctionItem?.id}>
                  <ScheduleItem auctionItem={auctionItem} />
                </div>
              ))}
        </section>
        {pastAuctionList?.length ? (
          <PastAuction>
            <div className="mb-5 flex flex-col">
              <span className="text-14 text-[#767676]">???????????? ??????</span>
              <span className="text-20 font-bold text-[#191919]">
                ?????? ?????? ?????????
              </span>
            </div>
            <Swiper
              spaceBetween={20}
              slidesPerGroup={1}
              slidesPerView={1}
              modules={[Pagination]}
              pagination={true}
              className="h-[360px]"
            >
              {!!pastAuctionList &&
                makeThreeEach(pastAuctionList.reverse())?.map(
                  (auctionItem: AuctionList[], index: number) => (
                    <SwiperSlide key={'' + index}>
                      {auctionItem.map((auctionItem: AuctionList) => (
                        <AuctionItem
                          key={auctionItem.id}
                          auctionItem={auctionItem}
                        />
                      ))}
                    </SwiperSlide>
                  ),
                )}
            </Swiper>
          </PastAuction>
        ) : (
          <div></div>
        )}
        {isUser ||
        !auctionList?.filter((auction) => auction.status === 'scheduled')
          .length ? (
          <div className="h-16" />
        ) : (
          <FloatButton />
        )}
      </Layout>
      <Tab />
    </>
  );
}
