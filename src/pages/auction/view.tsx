import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'stories/Button';
import { useRouter } from 'next/router';
import useGetDetail from '@hooks/queries/useGetDetail';
import chatApi from '@apis/chat/chatApi';
import usePostPrefer from '@hooks/mutations/usePostPrefer';
import useDeletePrefer from '@hooks/mutations/useDeletePrefer';
import { useCountDown } from '@hooks/useCountDown';
import useGetProfile from '@hooks/queries/useGetProfile';
import KeywordBox from '@components/common/KeywordBox';
import Guarantee from '@components/auction/Guarantee';

export default function View() {
  const router = useRouter();

  const artWorkId = Number(router.query.id);
  const { data: detailData } = useGetDetail(artWorkId);
  const { artWork, artist } = detailData || {};
  const { data: userInfo } = useGetProfile();
  const { mutate: postPrefer } = usePostPrefer(artWork?.id!, '/auction');
  const { mutate: deletePrefer } = useDeletePrefer(artWork?.id!, '/auction');
  const [days, hours, minutes, seconds] = useCountDown?.(
    detailData?.endDate || '',
  );
  const remaind = +days + +hours + +minutes + +seconds;
  const isMine = userInfo?.id === artist?.id;

  const handleChat = async () => {
    const chatData = await chatApi.postChatRoom({
      artistId: artist?.id!,
      artWorkId: artWork?.id!,
    });
    router.push({
      pathname: '/chat/room',
      query: { id: chatData?.chatRoomId },
    });
  };

  const handlePreferButton = () => {
    if (detailData?.preferred) {
      deletePrefer();
    } else {
      postPrefer();
    }
  };

  const target = useRef<HTMLDivElement | null>(null);
  const [isCardOver, setIsCardOver] = useState(false);
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.boundingClientRect.y < 64) {
        setIsCardOver(true);
      } else {
        setIsCardOver(false);
      }
    });
  };

  useEffect(() => {
    let observer;
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        rootMargin: `0px 0px -${window.innerHeight - 64}px 0px`,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      <Layout>
        <div
          className={`fixed inset-x-0 top-0 z-50 mx-auto flex h-24 w-full max-w-[420px] items-center justify-between px-5 ${
            isCardOver && 'bg-white'
          }`}
        >
          {isCardOver ? (
            <>
              <Image
                onClick={() => router.back()}
                alt="back"
                src="/svg/icons/auction/icon_arrow_black.svg"
                width="24"
                height="24"
                className="cursor-pointer"
              />
              {!isMine && detailData?.preferred && (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/icon_heart_filled.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              )}
              {!isMine && !detailData?.preferred && (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/auction/icon_heart_black.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              )}
            </>
          ) : (
            <>
              <Image
                alt="back"
                src="/svg/icons/auction/icon_arrow_white.svg"
                width="24"
                height="24"
                className="cursor-pointer"
                onClick={() => router.back()}
              />
              {!isMine && detailData?.preferred && (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/icon_heart_filled.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              )}

              {!isMine && !detailData?.preferred && (
                <Image
                  onClick={handlePreferButton}
                  alt="prefer"
                  src="/svg/icons/auction/icon_heart_white.svg"
                  width="24"
                  height="24"
                  className="cursor-pointer"
                />
              )}
            </>
          )}
        </div>

        <section className="absolute inset-x-0 top-0 h-60">
          <Image
            alt="detail"
            src={artWork?.images[0] || '/svg/example/detail.svg'}
            fill
            className="object-cover"
            quality={100}
          />
        </section>
        <section
          ref={target}
          className="absolute inset-x-0 top-[13rem] h-full rounded-2xl bg-white px-6 py-8"
        >
          <article>
            <div>
              <div className="flex items-center justify-between">
                <span className="max-w-[12rem] text-18 font-semibold">
                  {artWork?.title}
                </span>
                {remaind > 0 ? (
                  !Number.isNaN(+days) && (
                    <span className="text-14">
                      <span className="rounded-l-md bg-[#F8F8FA] px-2 py-1 text-brand">
                        ????????????
                      </span>

                      <span className="rounded-r-md bg-brand px-2 py-1 text-[#FFFFFF]">
                        {
                          <span
                            className={`${
                              +days >= 1 ? 'w-fit' : 'w-[66px]'
                            } text-[14px] font-medium tracking-widest`}
                          >
                            {+days >= 1
                              ? 'D-' + days
                              : hours + ':' + minutes + ':' + seconds}
                          </span>
                        }
                      </span>
                    </span>
                  )
                ) : (
                  <span className="flex rounded-md border border-[#999999] px-2 py-0.5 text-14 text-[#999999]">
                    <Image
                      alt="clock"
                      src="/svg/icons/icon_clock_gray.svg"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    00:00:00
                  </span>
                )}
              </div>
              <div className="mt-3 text-14">{artist?.artistEducation}</div>
            </div>
          </article>
          <article className="space-y-3 py-8 text-14 leading-[14px]">
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">
                ?????????
              </span>
              <span className="text-[#191919]">{artist?.artistName}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">
                ????????????
              </span>
              <span className="text-[#191919]">{artWork?.productionYear}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">??????</span>
              <span className="text-[#191919]">{artWork?.genre}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">??????</span>
              <span className="text-[#191919]">{artWork?.material}</span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">??????</span>
              <span className="text-[#191919]">
                {artWork?.frame ? '??????' : '??????'}
              </span>
            </p>
            <p>
              <span className="inline-block w-[6rem] text-[#767676]">??????</span>
              <span className="text-[#191919]">
                {artWork?.artWorkSize?.width}x{artWork?.artWorkSize?.length}x
                {artWork?.artWorkSize?.height} | {artWork?.artWorkSize?.size}???
              </span>
            </p>
          </article>
          <div className="mt-8 border-y border-y-[#EDEDED] py-8">
            <div className="flex w-[74px] flex-col items-center justify-center">
              <p className="w-full text-center font-medium">???????????????</p>
              <div className="relative my-2 flex aspect-square w-[4rem] cursor-pointer items-center justify-center overflow-hidden rounded-full border  border-[#999999]">
                {artist?.artistImage ? (
                  <Image
                    src={artist?.artistImage}
                    alt="profile"
                    priority
                    fill
                    className="object-cover"
                    onClick={() => {
                      router.push({
                        pathname: '/profile/detail',
                        query: { id: artist?.id },
                      });
                    }}
                  />
                ) : (
                  <Image
                    src="/svg/icons/profile/icon_avatar.svg"
                    alt="user"
                    width={40}
                    height={40}
                    onClick={() => {
                      router.push({
                        pathname: '/profile/detail',
                        query: { id: artist?.id },
                      });
                    }}
                  />
                )}
              </div>
              <div className="w-fulltext-center ">{artist?.artistName}</div>
            </div>
          </div>

          <article className="border-b py-8 font-medium">
            <div className="text-16">?????? ??????</div>
            <div className="mt-2 text-10 text-brand">
              ?????? ?????? ??? ????????? ?????? ???????????? ????????? ?????? ??? ??? ?????????.
            </div>
            <div className="mt-4">
              <p className="text-14">{artWork?.description}</p>
              <div className="mt-4 flex flex-wrap">
                {artWork?.keywords?.map((keyword: string, idx: number) => (
                  <KeywordBox text={keyword} key={idx} />
                ))}
              </div>
            </div>
          </article>
          <article>
            {artWork?.images.slice(1).map((image: string, idx: number) => (
              <div key={idx} className="relative mt-8 aspect-square w-full">
                <Image
                  src={image}
                  alt="artwork"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </article>
          {artWork && artist && (
            <Guarantee
              mainImage={artWork?.images[0]}
              guaranteeImage={artWork?.guaranteeImage}
              title={artWork?.title}
              nickname={artist?.artistName}
              productionYear={artWork?.productionYear}
              genre={artWork?.genre}
              width={artWork?.artWorkSize?.width}
              length={artWork?.artWorkSize?.length}
              height={artWork?.artWorkSize?.height}
            />
          )}
          <div className="h-[7rem]" />
        </section>
      </Layout>
      {
        <article className="absolute inset-x-0 bottom-0 mx-auto max-w-[420px]">
          <div className="to-gray-10 h-[18px] bg-gradient-to-t from-white" />
          <div className="m-auto flex w-full gap-5 bg-white  px-6 pb-3 shadow-lg">
            <Button
              text="????????????"
              kind="outlined"
              onClick={handleChat}
              disabled={isMine}
            />
            <Button
              text="????????????"
              onClick={() =>
                router.push({
                  pathname: '/auction/bidding',
                  query: { id: artWorkId },
                })
              }
              disabled={remaind <= 0}
            />
          </div>
        </article>
      }
    </>
  );
}
