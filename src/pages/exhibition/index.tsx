import 'swiper/css';
import tw from 'tailwind-styled-components';
import Modal from '@components/exhibition/Modal';
import Navigate from '@components/common/Navigate';
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useRouter } from 'next/router';

const DUMP_ART_LISTS = [
  {
    img: 'asdasd',
    title: '콰야 녹아내리는 고드름',
    major: '홍익대학교 예술학과',
    description:
      '대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적 언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를 캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의 질서를 만들어간다.',
  },
  {
    img: '111111',
    title: 'asodnvioansodn',
    major: '건국대학교 미술학과',
    description:
      '대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적 언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를 캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의 질서를 만들어간다.',
  },
  {
    img: '222222222',
    title: '콰야 녹아내리는 고드름',
    major: '단국대학교 조형과',
    description:
      '대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적 언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를 캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의 질서를 만들어간다.',
  },
];

interface DefaultProps {
  [key: string]: any;
}

const ExhibitionLayout = tw.div<DefaultProps>`
font-Pretendard w-full px-6 pt-[45px] border h-[812px] relative overflow-y-hidden overflow-x-hidden
`;

const NextSlide = ({ children }) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>{children}</button>;
};

const PrevSlide = ({ children }) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slidePrev()}>{children}</button>;
};

export default function Exhibition() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(true);
  const [isExpansion, setExpansion] = useState<boolean>(false);
  const router = useRouter();

  const onCloseModal = () => {
    setIsOpen(false);
  };
  const handleLeftButton = () => {
    // 작품 더보기 페이지로 이동
    router.push('/');
  };

  const handleRightButton = () => {
    // 해당 작품 작가 프로필로 이동
    router.push('/');
  };

  const handleSwipeArrow = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    console.log(isOpen);
  };

  const handleExpansion = () => {
    if (modal) {
      setModal(false);
      setExpansion(true);
    } else {
      setModal(true);
      setExpansion(false);
    }
    console.log(isOpen);
  };

  return (
    <ExhibitionLayout>
      <Image
        alt="exhibition_bg"
        src="/svg/icons/bg_exhibition.jpg"
        quality={100}
        fill
        sizes="100vh"
        style={{
          objectFit: 'cover',
        }}
      />
      {isExpansion ? (
        <Image
          alt="canvas"
          src="/svg/icons/bg_canvas.svg"
          quality={100}
          width={400}
          height={0}
          sizes="100vh"
          style={{
            objectFit: 'contain',
          }}
          className="scale-[1.8] top-[240px] right-[-3px] absolute"
        />
      ) : (
        <Image
          alt="canvas"
          src="/svg/icons/bg_canvas.svg"
          quality={100}
          fill
          sizes="100vh"
          style={{
            objectFit: 'cover',
          }}
        />
      )}
      <Navigate message="전시회" isRightButton={false} />
      <Swiper
        className="h-full"
        modules={[Navigation]}
        navigation
        spaceBetween={50}
      >
        <div className="flex justify-between absolute w-[351px] top-[300px] ml-[-15px] z-50">
          <PrevSlide>
            <Image
              src="/svg/icons/icon_back_white.svg"
              alt="back"
              width={10}
              height={10}
            />
          </PrevSlide>
          <NextSlide>
            <Image
              src="/svg/icons/icon_arrow_white.svg"
              alt="back"
              width={10}
              height={10}
            />
          </NextSlide>
        </div>
        {DUMP_ART_LISTS.map((art, idx) => (
          <SwiperSlide key={idx}>
            {isExpansion ? (
              <div>
                <div className="mt-[80px] relative">
                  <Image
                    src="/svg/example/exhibition.svg"
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                </div>
                <div className="absolute top-[95px] right-[15px]">
                  <Image
                    src="/svg/icons/icon_maximize.svg"
                    alt="image"
                    width={25}
                    height={0}
                    className="cursor-pointer"
                    onClick={handleExpansion}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="w-[240px] h-[348px] mr-[44px] mt-[35px] m-auto flex justify-center relative">
                  <Image
                    src="/svg/example/exhibition.svg"
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                </div>
                <div className="absolute top-[45px] right-[55px]">
                  <Image
                    src="/svg/icons/icon_maximize.svg"
                    alt="image"
                    width={25}
                    height={0}
                    className="cursor-pointer"
                    onClick={handleExpansion}
                  />
                </div>
              </div>
            )}
            {modal && (
              <div>
                <Modal
                  isOpen={isOpen}
                  $open={isOpen}
                  title={art.title}
                  major={art.major}
                  description={art.description}
                  onCloseModal={onCloseModal}
                  handleLeftButton={handleLeftButton}
                  handleRighButton={handleRightButton}
                  handleSwipeArrow={handleSwipeArrow}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </ExhibitionLayout>
  );
}
