import Layout from '@components/common/Layout';
import React, { useState } from 'react';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import favorite from '@public/svg/icons/icon_favorite.svg';

export default function Wish() {
  const [wishList, setWishList] = useState([]);
  return (
    <Layout>
      <Navigate message="찜 목록" isRightButton={false} />
      <div className="w-full grid grid-cols-2 gap-x-[15px] gap-y-[23px]">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div
            className="rounded-lg hover:ring-1 hover:ring-blue-500 cursor-pointer"
            key={i}
          >
            <div className="h-28 bg-gray-300 rounded-t-lg relative">
              <Image
                className="absolute top-3 right-3"
                src={favorite}
                alt="favoirte"
              />
            </div>
            <div className="h-28 p-3 rounded-b-lg border-x-[1px] border-[#ededed] border-b-[1px]">
              <div className="flex text-white w-[84px] text-[10px]">
                <div className="w-1/2 h-[17px] bg-[#4B9E77]  flex justify-center items-center">
                  입찰중
                </div>
                <div className="w-1/2 h-[17px] bg-[#F5535D]  flex justify-center items-center">
                  HOT
                </div>
              </div>
              <div className="pt-[6px]">
                <div className="text-14 leading-4">퓨처리즘</div>
                <div className="text-14 leading-6">자연과 공생하는 미래</div>
                <div className="text-14 leading-6 font-medium">250,000원</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
