import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import SelectKeyword from '@components/profile/Selectkeyword';
import usePatchKeyword from '@hooks/mutations/usePatchKeyword';
import useGetProfile from '@hooks/queries/useGetProfile';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Keyword() {
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const { data } = useGetProfile();
  const { mutate, data: keywordData } = usePatchKeyword();
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setKeywordList(data?.keywords || []);
  }, [data]);

  const handleButtonClick = () => {
    const keywordsObject = {
      keywords: keywordList,
    };
    mutate(keywordsObject, {
      onSuccess: () => {
        setIsModal(true);
      },
    });
  };

  return (
    <Layout>
      <Navigate isRightButton={false} />
      <div className="text-16 font-semibold">관심있는 키워드를 골라주세요.</div>
      <SelectKeyword
        className="mt-[0.625rem]"
        setKeywordList={setKeywordList}
        keywordList={keywordList}
      />

      <Button
        text="완료"
        className="absolute inset-x-0 bottom-[2.125rem] m-auto"
        onClick={handleButtonClick}
        disabled={keywordList?.length === 0}
      />
      <Modal
        message="취향 분석이 완료 되었습니다."
        isModal={isModal}
        onCloseModal={() => {
          router.back();
        }}
        onAccept={() => {
          router.back();
        }}
      />
    </Layout>
  );
}
