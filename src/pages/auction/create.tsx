import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React from 'react';

export default function Auction() {
  return (
    <Layout>
      <Navigate right_message="완료" />
      <div className="w-full space-y-6">
        <div>
          <Input
            type="text"
            label="작품명"
            placeholder="작품명을 입력해주세요"
          />
          <Input type="text" placeholder="태크추가" />
        </div>
        <div>
          <Input
            type="text"
            label="제작연도"
            placeholder="제작연도를 입력해주세요"
          />
        </div>
        <div>
          <Input
            type="text"
            label="재료"
            placeholder="사용한 재료를 입력해주세요."
          />
        </div>
        <div>
          <Input
            type="text"
            label="크기/호수"
            placeholder="작품 크기/호수를 입력해주세요."
          />
        </div>
        <div>
          <Input
            type="text"
            label="작품 판매가"
            placeholder="KRW 0 ~ 10,000,000"
          />
        </div>
        <div>
          <Input type="text" label="작품 상태" placeholder="보통" />
          <Input
            type="text"
            placeholder="작품 상태에 대해 자세히 기입해주세요."
          />
        </div>
        <div>
          <Input
            type="text"
            label="작품 보증서"
            placeholder="전자 서명이 필요합니다."
          />
        </div>
      </div>
    </Layout>
  );
}
