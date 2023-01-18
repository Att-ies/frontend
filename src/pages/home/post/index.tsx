import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from '@components/common/Select';
import { Artwork } from 'types/artwork';
import FileItem from '@components/inquiry/FileItem';
import Guarantee from '@components/home/guarantee';

const ARTWORK_STATUS = [
  { value: '매우 좋음' },
  { value: '좋음' },
  { value: '보통' },
];

const IS_FRAME = [{ value: '있음' }, { value: '없음' }];

export default function Post() {
  const [isGuaranteeModal, setIsGuaranteeModal] = useState<Boolean>(false);
  const [signature, setSignature] = useState<string>('');
  const [fileLists, setFileLists] = useState<File[]>([]);
  const handleRemoveFile = (targetName: string): void => {
    const newFileLists = fileLists.filter((file) => {
      return file.name !== targetName;
    });
    setFileLists(newFileLists);
  };

  const { register, setValue, watch, handleSubmit } = useForm<Artwork>();

  const file = watch('image');
  useEffect(() => {
    if (fileLists?.length <= 5 && fileLists?.length + file?.length <= 5) {
      const newFileList: any = [];
      for (const i of file) {
        newFileList.push(i);
      }
      setFileLists((prev) => prev.concat(newFileList));
    }
  }, [file]);

  const onSubmit = (form: Artwork) => {
    console.log(form);
    const {
      title,
      productionYear,
      description,
      material,
      frame,
      width,
      length,
      height,
      size,
      price,
      status,
      statusDescription,
    } = form;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('productionYear', productionYear + '');
    formData.append('description', description);
    formData.append('material', material);
    if (frame + '' === '있음') {
      formData.append('frame', 'true');
    } else {
      formData.append('frame', 'false');
    }
    formData.append('width', width + '');
    formData.append('length', length + '');
    formData.append('height', height + '');
    formData.append('productionYear', size);
    formData.append('productionYear', price + '');
    formData.append('productionYear', status);
    formData.append('productionYear', statusDescription);

    console.log(formData);
  };

  return (
    <>
      {!isGuaranteeModal ? (
        <Layout>
          <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <Navigate right_message="완료" />
            <section className="flex ">
              <label htmlFor="fileImage">
                <div className="cursor-pointer w-[60px] h-[60px] border-[1px] border-[#DBDBDB] rounded flex flex-col justify-center items-center mr-0">
                  <Image
                    src="/svg/icons/icon_camera_black.svg"
                    alt="camera"
                    width={17}
                    height={17}
                  />
                  <div className="text-12 text-[#999999]">
                    {fileLists.length ? `${fileLists.length}/5` : '0/5'}
                  </div>
                </div>
              </label>
              {fileLists.length ? (
                <div className="flex flex-wrap">
                  {fileLists.map((file, idx) => (
                    <FileItem
                      handler={handleRemoveFile}
                      key={idx}
                      file={file}
                    />
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
              />
            </section>
            <section>
              <Input
                type="text"
                label="작품명"
                placeholder="작품명을 입력해주세요"
                register={register('title')}
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
            </section>
            <Input
              type="number"
              label="제작연도"
              min={2010}
              placeholder="숫자만 입력해주세요. ex)2022"
              register={register('productionYear')}
            />
            <section>
              <div className="flex justify-between">
                <label htmlFor="description" className="text-14 leading-8">
                  작품설명
                </label>
                <div className="text-14 text-[#999999]">
                  <span
                    className={`${
                      watch('description') ? 'text-[#191919]' : 'text-[#999999]'
                    }`}
                  >
                    {watch('description')?.length}/1000
                  </span>
                </div>
              </div>
              <textarea
                id="content"
                maxLength={1000}
                placeholder="작품에 대해 자세히 기입해주세요."
                className="w-full h-[150px] placeholder:text-14 overflow-hidden resize-none placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8]  "
                {...register('description')}
              />
            </section>
            <Input
              type="text"
              label="재료"
              placeholder="사용한 재료를 입력해주세요."
              register={register('material')}
            />
            <Select
              name="frame"
              setValue={setValue}
              options={IS_FRAME}
              label="액자"
            />
            <section>
              <span className="text-14">크기/호수</span>
              <article className="flex gap-4">
                <Input
                  type="number"
                  min={0}
                  placeholder="가로"
                  className=""
                  register={register('width')}
                  unit="cm"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="세로"
                  className=""
                  register={register('length')}
                  unit="cm"
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="높이"
                  className=""
                  register={register('height')}
                  unit="cm"
                />
              </article>
              <article className="w-[calc((100%-2rem)/3)]">
                <Input
                  type="number"
                  placeholder="10"
                  className=""
                  register={register('size')}
                  unit="호"
                />
              </article>
            </section>
            <Input
              type="text"
              label="작품 판매가"
              placeholder="작품 최소 가격을 설정해주세요."
              register={register('price')}
            />
            <Select
              name="status"
              setValue={setValue}
              options={ARTWORK_STATUS}
              label="작품 상태"
            />
            <textarea
              id="content"
              maxLength={1000}
              placeholder="작품상태에 대해 자세히 기입해주세요."
              className="w-full h-[150px] placeholder:text-14 overflow-hidden resize-none placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8]  "
              {...register('statusDescription')}
            />
            <div
              className="w-full cursor-pointer"
              onClick={() => setIsGuaranteeModal(true)}
            >
              <label htmlFor="statusDetail" className="text-14 leading-8">
                작품 보증서
              </label>
              {signature ? (
                <div
                  className="w-full h-[128px] cursor-pointer overflow-hidden border rounded border-[#DBDBDB] p-4 flex justify-center items-center"
                  onClick={() => setIsGuaranteeModal(true)}
                >
                  <Image
                    src={signature}
                    width={163}
                    height={91}
                    alt="guarantee"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="h-[52px] w-full text-[13px] rounded-[4px] border text-[#999999] border-[#D8D8D8] flex items-center pl-3">
                    전자 서명이 필요합니다.
                  </div>
                  <div
                    onClick={() => setIsGuaranteeModal(true)}
                    className="cursor-pointer absolute right-4 bottom-0 flex items-center h-[52px]"
                  >
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
                      작품의 선정성, 유해성이 통신판매업 시행령(2019) 기준에
                      맞지 아니 하다고 판단되는 경우
                    </li>
                    <li>
                      제출된 자료의 내용이 미흡하거나, 허위로 기재된 사실이
                      밝혀질 경우
                    </li>
                    <li>
                      제출된 작품 이미지로 작품의 형태 유무의 대부분을 판단할 수
                      없는 경우
                    </li>
                    <li>
                      과반 이상의 심사위원이 작품이 완성되지 않았다고 판단하거나
                      프로그램의 취지에 맞지 아니하다고 판단될 경우
                    </li>
                    <li>
                      유사 온라인 아트플랫폼에 이미 등록되었거나 확인될 경우
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </Layout>
      ) : (
        <Guarantee
          setSignature={setSignature}
          onCloseGuarantee={() => {
            setIsGuaranteeModal(false);
          }}
        />
      )}
    </>
  );
}
