import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useState } from 'react';
import FileItem from '@components/inquiry/FileItem';
import { useForm } from 'react-hook-form';

interface Artword {
  image: string;
  title: string;
  tags: string[];
  year: string;
  material: string;
  size: string;
  price: string;
  status: string;
  statusDetail: string;
  certificate: string;
}

export default function Auction() {
  const [fileImages, setFileImages] = useState<string[]>([]);
  const [fileSize, setFileSize] = useState<number>(0);
  const onRemove = (targetId: string): void => {
    const newFileImages = fileImages.filter((fileImages) => {
      return fileImages !== targetId;
    });
    setFileImages(newFileImages);
  };

  const { register } = useForm<Artword>();

  const uploadFiles = (e) => {
    console.log(e);
    if (e.target.files?.length <= 5 && fileImages?.length < 5) {
      const fileArray: any = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file),
      );
      setFileImages((prevImages) => prevImages.concat(fileArray));
      for (const file of e.target.files) {
        setFileSize((prevFileSize) => prevFileSize + file.size);
      }
      console.log(fileArray);
    } else {
      return;
    }
  };

  return (
    <Layout>
      <Navigate right_message="완료" />
      <div className="w-full space-y-6">
        <div className="flex">
          <label htmlFor="fileImage">
            <div className="w-[60px] h-[60px] border-[1px] border-[#DBDBDB] rounded flex flex-col justify-center items-center mr-0">
              <Image
                src="/svg/icons/icon_camera_black.svg"
                alt="camera"
                width={24}
                height={24}
              />
              {fileImages.length ? (
                <div className="text-12">
                  <span className="text-[#F5535D]">{fileImages.length}</span>
                  /5
                </div>
              ) : (
                ''
              )}
            </div>
          </label>
          {fileImages.length ? (
            <div className="flex flex-wrap">
              {fileImages.map((img) => (
                <FileItem handler={onRemove} key={img} img={img} />
              ))}
            </div>
          ) : (
            ''
          )}
          <input
            multiple
            type="file"
            id="fileImage"
            className="hidden"
            {...register('image')}
            onChange={uploadFiles}
          />
        </div>
        <div>
          <Input
            type="text"
            label="작품명"
            placeholder="작품명을 입력해주세요"
          />
          <div className="relative">
            <Input
              className="h-[38px] w-[92px]"
              type="text"
              placeholder="태크추가"
            ></Input>
            <div className="absolute left-[63px] bottom-0 flex items-center h-full">
              <Image
                src="/svg/icons/icon_plus_gray.svg"
                alt="camera"
                width={20}
                height={20}
              />
            </div>
          </div>
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
