import Layout from '@components/common/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper';
import Button from '@components/common/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Join() {
  const [skipVisible, setSkipVisible] = useState(true);
  const router = useRouter();
  return (
    <Layout>
      <div>
        <div className="text-14 text-right h-4 cursor-pointer text-[#999999]">
          {skipVisible ? '건너뛰기' : ''}
        </div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwipe mt-4"
          onReachEnd={() => setSkipVisible(false)}
          onSlideChange={() => {
            if (!skipVisible) setSkipVisible(true);
          }}
        >
          <SwiperSlide>
            <div>
              <div className="w-full h-96 bg-orange-400 aspect-square rounded-md"></div>
              <div className="pl-6">
                <h1 className="text-20 font-medium mt-16">
                  버려지는 작품을 판매해보세요.
                </h1>
                <p className="text-14 text-[#767676] mt-2">
                  졸업작품 혹은 과제물로 열심히 작업 후 <br />
                  버려지고 방치되는게 아깝지 않으신가요?
                </p>
              </div>
              <div className="space-x-3 flex justify-center mt-6">
                <div className="w-2 rounded-full aspect-square bg-[#F5535D]"></div>
                <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
                <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <div className="w-full h-96 bg-cyan-500 aspect-square rounded-md"></div>
              <div className="pl-6">
                <h1 className="text-20 font-medium mt-16">
                  작품 외에 걱정은 NO
                </h1>
                <p className="text-14 text-[#767676] mt-2">
                  마케팅, 배송, 판매까지 저희가 모두 다 해드려요. <br />
                  작가님이 작품에만 집중할 수 있도록 도와줘요.
                </p>
              </div>
              <div className="space-x-3 flex justify-center mt-6">
                <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
                <div className="w-2 rounded-full aspect-square bg-[#F5535D]"></div>
                <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <div className="w-full h-96 bg-lime-400 aspect-square rounded-md"></div>
              <div className="pl-6">
                <h1 className="text-20 font-medium mt-16">
                  채팅으로 컬렉터와 소통해요
                </h1>
                <p className="text-14 text-[#767676] mt-2">
                  아티스트와 컬렉터가 대화할 수 있는 <br />
                  현대미술의 장점! 채팅으로 컬렉터분들과 소통해요.
                </p>
              </div>
              <div className="space-x-3 flex justify-center mt-6">
                <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
                <div className="w-2 rounded-full aspect-square bg-[#D9D9D9]"></div>
                <div className="w-2 rounded-full aspect-square bg-[#F5535D]"></div>
              </div>
              <Button
                className="mt-11"
                text="작가 등록"
                onClick={() => router.push('/auth/author/join02')}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Layout>
  );
}

export default Join;
