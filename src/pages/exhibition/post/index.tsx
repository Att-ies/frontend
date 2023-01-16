import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useState } from 'react';
import FileItem from '@components/inquiry/FileItem';
import { useForm } from 'react-hook-form';
import Select from '@components/common/Select';
import { useRouter } from 'next/router';
import { useAppSelector } from '@features/hooks';

const ARTWORK_STATUS = [
  { value: '매우 좋음' },
  { value: '좋음' },
  { value: '보통' },
];

export default function Post() {
  const [fileImages, setFileImages] = useState<string[]>([]);
  const [fileSize, setFileSize] = useState<number>(0);
  const onRemove = (targetId: string): void => {
    const newFileImages = fileImages.filter((fileImages) => {
      return fileImages !== targetId;
    });
    setFileImages(newFileImages);
  };

  const signatureState = useAppSelector((state) => state.signature);

  const { register, setValue, watch } = useForm<Artwork>();
  const router = useRouter();

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

  const handleSignatureClick = () => {
    router.push('/exhibition/post/guarantee');
  };

  return (
    <Layout>
      <Navigate right_message="완료" />
      <div className="w-full space-y-6">
        <div className="flex">
          <label htmlFor="fileImage">
            <div className="cursor-pointer w-[60px] h-[60px] border-[1px] border-[#DBDBDB] rounded flex flex-col justify-center items-center mr-0">
              <Image
                src="/svg/icons/icon_camera_black.svg"
                alt="camera"
                width={17}
                height={17}
              />
              <div className="text-12 text-[#999999]">
                {fileImages.length ? `${fileImages.length}/5` : '0/5'}
              </div>
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
          <button className="relative">
            <div className="h-[38px] w-[92px] text-[13px] rounded-[4px] border text-[#999999] border-[#D8D8D8] flex items-center pl-3">
              태그추가
            </div>
            <div className="absolute left-[63px] bottom-0 flex items-center h-full">
              <Image
                src="/svg/icons/icon_plus_gray.svg"
                alt="tag"
                width={20}
                height={20}
              />
            </div>
          </button>
        </div>
        <div>
          <Input
            type="number"
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
          <Select
            name="year"
            setValue={setValue}
            options={ARTWORK_STATUS}
            label="작품 상태"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label htmlFor="statusDeatil" className="text-14 leading-8">
              작품 상세
            </label>
            <div className="text-14 leading-8 text-[#999999]">
              <span
                className={`${
                  watch('statusDetail') ? 'text-[#191919]' : 'text-[#999999]'
                }`}
              >
                {watch('statusDetail') ? watch('statusDetail').length : '0'}
              </span>
              <span>/1000</span>
            </div>
          </div>
          <textarea
            id="content"
            maxLength={1000}
            placeholder="작품에 대해 자세히 기입해주세요."
            className="w-full h-[150px] placeholder:absolute placeholder:text-14 overflow-hidden resize-none placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8]"
            {...register('statusDetail', {
              required: true,
            })}
          ></textarea>
        </div>
        <div className="w-full">
          <label htmlFor="statusDeatil" className="text-14 leading-8">
            작품 보증서
          </label>
          {signatureState.signature ? (
            <div
              className="w-full h-[128px] cursor-pointer overflow-hidden border rounded border-[#DBDBDB] p-4 flex justify-center items-center"
              onClick={handleSignatureClick}
            >
              <Image
                src={signatureState.signature}
                width={163}
                height={91}
                alt="guarantee"
              />
            </div>
          ) : (
            <div
              className="relative cursor-pointer"
              onClick={handleSignatureClick}
            >
              <div className="h-[52px] w-full text-[13px] rounded-[4px] border text-[#999999] border-[#D8D8D8] flex items-center pl-3">
                전자 서명이 필요합니다.
              </div>
              <div className="absolute right-4 bottom-0 flex items-center h-[52px]">
                <Image
                  src="/svg/icons/icon_pencil_gray.svg"
                  alt="setting"
                  className="cursor-pointer"
                  width="23"
                  height="0"
                />
              </div>
            </div>
          )}
        </div>

        <div className="h-[336px] relative">
          <div className="w-[375px] h-[376px] absolute -left-6 bottom-0">
            <div className="mt-12 h-4 bg-[#F8F8FA]"></div>
            <div className="text-12 px-6">
              <p className="font-medium mt-8">
                다음의 경우 작품등록이 제외될 수 있습니다.
              </p>
              <ul className="text-[#767676] mt-3 ml-3 space-y-2 list-disc tracking-tight">
                <li>
                  작품의 선정성, 유해성이 통신판매업 시행령(2019) 기준에 맞지
                  아니 하다고 판단되는 경우
                </li>
                <li>
                  제출된 자료의 내용이 미흡하거나, 허위로 기재된 사실이 밝혀질
                  경우
                </li>
                <li>
                  제출된 작품 이미지로 작품의 형태 유무의 대부분을 판단할 수
                  없는 경우
                </li>
                <li>
                  과반 이상의 심사위원이 작품이 완성되지 않았다고 판단하거나
                  프로그램의 취지에 맞지 아니하다고 판단될 경우
                </li>
                <li>유사 온라인 아트플랫폼에 이미 등록되었거나 확인될 경우</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
