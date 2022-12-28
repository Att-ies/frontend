import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import back from '@public/svg/icons/icon_back.svg';
import close from '@public/svg/icons/icon_grayClose.svg';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface defaultProps {
  [key: string]: any;
}

const SearchBox = tw.header<defaultProps>`
flex justify-between items-center font-semibold relative h-[64px]
`;

const KeywordBox = tw.li<defaultProps>`
border-b-[1px] border-[#EDEDED] text-[#767676] flex px-2 justify-between basis-[48.6%] p-0 cursor-pointer odd:mr-2 pb-1 mt-2
`;

export default function Search() {
  const router = useRouter();

  const handleBackBtn = () => {
    router.back();
  };

  const [keywords, setKeywords] = useState<string[]>(['유화', 'dbghk']);

  return (
    <Layout>
      <SearchBox>
        <div className="grow-[1]" onClick={() => handleBackBtn()}>
          <Image src={back} alt="back" />
        </div>
        <form className="grow-[5]">
          <Input
            className="h-[42px] bg-[#F1F1F5] border-none"
            type="text"
            placeholder="검색어를 입력해주세요"
          />
        </form>
      </SearchBox>
      <section className="mt-[38px]">
        <div className="flex justify-between">
          <span className="text-base font-semibold">최근 검색어</span>
          {keywords.length ? (
            <span className="text-xs leading-6 text-[#999999]">
              모두 지우기
            </span>
          ) : (
            <span className="text-xs leading-6 text-[#999999]"></span>
          )}
        </div>
        <div className="mt-[15px]">
          <ul className="flex m-auto flex-wrap">
            {keywords.length ? (
              keywords.map((keyword) => (
                <KeywordBox key={keyword}>
                  <span>{keyword}</span>
                  <span className="flex align-middle ml-2">
                    <Image src={close} alt="close" width={20} height={20} />
                  </span>
                </KeywordBox>
              ))
            ) : (
              <div>최근 검색어가 없습니다.</div>
            )}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
