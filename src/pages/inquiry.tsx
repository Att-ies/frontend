import Navigate from '@components/common/Navigate';
import Layout from '@components/common/Layout';
import Button from '@components/common/Button';
import arrow from '@public/svg/icons/icon_arrow_down.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tab, Disclosure } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@components/common/ErrorMessage';
import { useState } from 'react';

interface InquiryForm {
  title: string;
  content: string;
  image: string;
}

interface DumpInquiryListsForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
}

const DUMP_INQUIRY_LISTS: DumpInquiryListsForm[] = [
  {
    date: '2023.01.05',
    time: '18:40',
    title: '[녹아내리는 고드름] 작품 관련 질문입니다.',
    content: '얼마인가요?',
    status: '답변중',
  },
  {
    date: '2023.01.02',
    time: '18:40',
    title: '[녹아내리는 고드름] 작품 관련 질문입니다.',
    content: '얼마인가요?',
    status: '답변완료',
  },
  {
    date: '2023.01.01',
    time: '12:40',
    title: '[녹아내리는 고드름] 작품 관련 질문입니다.',
    content: '얼마인가요?',
    status: '답변완료',
  },
];

export default function Inquiry() {
  const [Inquiry, setInquiry] = useState(DUMP_INQUIRY_LISTS);

  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InquiryForm>({ mode: 'onTouched' });

  const onSubmit = () => {
    // 문의 API
  };

  return (
    <Layout>
      <Navigate
        handleLeftButton={handleLeftButton}
        message="1:1문의"
        isRightButton={false}
      />
      <Tab.Group>
        <Tab.List>
          <Tab className="w-1/2 h-[32px] font-bold text-16 ui-selected:border-b-[2px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b-[1px] ui-not-selected:text-[#999999] mb-[28px]">
            문의하기
          </Tab>
          <Tab className="w-1/2 h-[32px] font-bold text-16 ui-selected:border-b-[2px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b-[1px] ui-not-selected:text-[#999999] ">
            문의내역확인
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <section className="flex flex-col mb-5">
                <div className="flex justify-between mb-3">
                  <label
                    htmlFor="title"
                    className="text-14 leading-8 font-bold"
                  >
                    제목
                  </label>
                  <span className="text-14 leading-8 text-[#999999]">
                    {watch('title') ? watch('title').length : '0'}/20
                  </span>
                </div>
                <input
                  id="title"
                  type="text"
                  placeholder="문의 제목을 입력해주세요."
                  className="w-full h-[52px] placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8] appearance-none"
                  {...register('title', {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.title && (
                  <ErrorMessage message="제목은 최대 20글자 입니다." />
                )}
              </section>
              <section>
                <div className="flex justify-between mb-3">
                  <label
                    htmlFor="content"
                    className="text-14 leading-8 font-bold"
                  >
                    문의 사항
                  </label>
                  <span className="text-14 leading-8 text-[#999999]">
                    {watch('content') ? watch('content').length : '0'}/1000
                  </span>
                </div>
                <textarea
                  id="content"
                  placeholder="정확한 상담을 위하여 자세한 문의사항을&#10;작성 부탁드립니다."
                  className="w-full h-[150px] placeholder:absolute placeholder:text-14 overflow-hidden resize-none placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8]"
                  {...register('content', {
                    required: true,
                    maxLength: 1000,
                  })}
                ></textarea>
                {errors.content && (
                  <ErrorMessage message="내용은 최대 1000글자 입니다." />
                )}
              </section>
              <section>
                <div className="flex justify-between mb-3">
                  <label className="text-14 leading-8 font-bold">
                    첨부파일
                  </label>
                  <span className="text-14 leading-8 text-[#999999]">
                    0/15MB
                  </span>
                </div>
                <Button text="+ 파일추가" className="h-10" />
                <div className="mt-3 text-12 text-[#999999] mb-[120px]">
                  동영상 등 크기 제한을 초과하는 대용량 파일을 전송하려면 구글
                  드라이브 링크를 첨부 바랍니다.
                </div>
              </section>
              <section className="w-full flex justify-between">
                <Button
                  kind="outlined"
                  text="취소"
                  className="w-[150px] h-[40px]"
                />
                <Button
                  type="submit"
                  text="문의접수"
                  className="w-[150px] h-[40px]"
                />
              </section>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            {Inquiry ? (
              <div>
                {Inquiry.map((item, idx) => (
                  <div key={idx} className="border-b-[1px] pb-6">
                    <Disclosure>
                      <div className="flex justify-start mt-5">
                        <span className="w-[70px] mr-2 border-[1px] border-[#DBDBDB] rounded-[39px] text-14 text-[#767676] text-center font-semibold py-[1px]">
                          {item.status}
                        </span>
                        <span className="text-[#999999] text-14">
                          {item.date} {item.time}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2 text-[#767676] ">
                        <span className="font-bold text-14">{item.title}</span>
                        <Disclosure.Button>
                          <Image src={arrow} alt={arrow} />
                        </Disclosure.Button>
                      </div>
                      <Disclosure.Panel className="text-gray-500 pt-5 text-14">
                        {item.content}
                      </Disclosure.Panel>
                    </Disclosure>
                  </div>
                ))}
                <div className="mt-[14px] text-[#999999] text-14 text-center">
                  최근 1년간 문의내역만 조회 가능합니다.
                </div>
              </div>
            ) : (
              <div className="mt-[200px] m-auto flex flex-col justify-center items-center text-14 text-[#999999]">
                1:1문의 내역이 존재하지 않습니다.
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
