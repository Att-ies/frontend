import Layout from '@components/common/Layout';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Button from 'stories/Button';

export default function Detail() {
  useEffect(() => {}, []);

  return (
    <Layout>
      <section>
        <Image
          alt=""
          src="/svg/example/detail.svg"
          width="0"
          height="0"
          className="absolute top-0 inset-x-0 w-full"
        />
      </section>
      <section className="absolute top-[13rem] bg-white inset-x-0 rounded-[1.6rem] h-full p-5">
        <article>
          <div className="relative">
            <div className="text-20 font-bold">콰야 녹아내리는 고드름</div>
            <div className="mt-1">홍익대학교 예술학과</div>
          </div>
          <p className="absolute right-5 top-5">
            <span className="text-[#F5535D] bg-[#F8F8FA] text-12 py-0.5 px-1 font-bold">
              마감까지
            </span>
            <span className="text-12 text-[#FFFFFF] bg-[#F5535D] py-0.5 px-1 font-bold">
              D-3
            </span>
          </p>
        </article>
        <article className="py-5">
          <p className="h-7">
            <span className="inline-block w-[6rem] text-[#767676]">작가명</span>
            <span className="text-[#191919]">아라 | Ara</span>
          </p>
          <p className="h-7">
            <span className="inline-block w-[6rem] text-[#767676]">
              제작연도
            </span>
            <span className="text-[#191919]">2022</span>
          </p>
          <p className="h-7">
            <span className="inline-block w-[6rem] text-[#767676]">장르</span>
            <span className="text-[#191919]">회화 | Painting</span>
          </p>
          <p className="h-7">
            <span className="inline-block w-[6rem] text-[#767676]">재료</span>
            <span className="text-[#191919]">재료 | Oill On Canvas</span>
          </p>
          <p className="h-7">
            <span className="inline-block w-[6rem] text-[#767676]">액자</span>
            <span className="text-[#191919]">없음</span>
          </p>
          <p className="h-7">
            <span className="inline-block w-[6rem] text-[#767676]">크기</span>
            <span className="text-[#191919]">41x31.8cm | 6호</span>
          </p>
        </article>
        <article className="py-8 px-2 border-y    ">
          <div className="font-bold text-18">작가 프로필</div>
          <div className="my-2 w-[5rem] h-[5rem] border border-[#999999] rounded-full flex justify-center items-center">
            <Image
              src="/svg/icons/profile/icon_avatar.svg"
              width="50"
              height="0"
            />
          </div>
          <div className="w-[5rem] text-center">아라</div>
        </article>
        <article className="mt-4 mb-3">
          <div className="text-18 font-bold">작품 설명</div>
          <div className="text-[#F5535D] text-10">
            세부 사항 등 궁금한 점은 채팅으로 작가와 소통 할 수 있어요.
          </div>
        </article>
        <article className="flex gap-5">
          <Button text="채팅하기" kind="outlined" />
          <Button text="응찰하기" />
        </article>
      </section>
    </Layout>
  );
}
