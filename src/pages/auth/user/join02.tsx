import Layout from '@components/common/Layout';
import Button from '../../../components/common/Button';
import Navigate from '@components/common/Navigate';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppSelector } from '@features/hooks';
import ErrorMessage from '@components/common/ErrorMessage';
import Modal from '@components/common/Modal';
import useUserJoin from '../../../hooks/queries/useUserJoin';

import { Member } from 'types/user';

interface KeywordForm {
  id: string;
  name: string;
}

const KEYWORDS: KeywordForm[] = [
  { id: '1', name: '심플한' },
  { id: '2', name: '세련된' },
  { id: '3', name: '모던한' },
  { id: '4', name: '서양화' },
  { id: '6', name: '변화의' },
  { id: '5', name: '유화' },
  { id: '7', name: '비판적인' },
  { id: '8', name: '동양화' },
  { id: '9', name: '미디어아트' },
  { id: '10', name: '풍경화' },
  { id: '11', name: '화려한' },
];

function Join02() {
  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };
  const [isModal, setIsModal] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const userState = useAppSelector((state) => state.user);

  const handleKeywordClick = (name) => {
    const tasteSelectedArr = [...keywords];
    if (tasteSelectedArr.includes(name)) {
      tasteSelectedArr.splice(tasteSelectedArr.indexOf(name), 1);
    } else {
      tasteSelectedArr.push(name);
    }
    setKeywords(tasteSelectedArr);
  };
  const { mutation, errorMessage } = useUserJoin();

  const handleSubmit = async () => {
    const tasteSelectedArr = [...keywords];
    const memberInfo: Member = {
      userId: userState.userId,
      nickname: userState.nickname,
      password: userState.password,
      telephone: userState.telephone,
      email: userState.email,
      keywords: tasteSelectedArr,
    };
    mutation.mutate(memberInfo);
    setIsModal(false);
  };
  const handleCompleteButton = () => {
    setIsModal(true);
  };
  const onCloseModal = () => {
    setIsModal(false);
  };

  return (
    <Layout>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          className="absolute left-[100px] top-[850px]"
        />
      )}
      <Modal
        message="취향 분석이 완료 되었습니다."
        isModal={isModal}
        onCloseModal={onCloseModal}
        onAccept={handleSubmit}
      />
      <Navigate right_message=" " handleLeftButton={handleLeftButton} />
      <div className="text-18 font-semibold">관심있는 키워드를 골라주세요.</div>
      <div className="flex flex-wrap py-4 text-[#767676]">
        {KEYWORDS.map((keyword) => (
          <div
            key={keyword.id}
            id={keyword.id}
            className={`${
              keywords.includes(keyword.name)
                ? 'border-[#F5535D] text-[#767676]'
                : 'border-[#CECECE] text-[#767676]'
            } w rounded-full flex justify-center items-center px-2 py-1 border mr-2 mb-2 cursor-pointer`}
            onClick={() => handleKeywordClick(keyword.name)}
          >
            {keyword.name}
          </div>
        ))}
      </div>
      <div className="h-[400px]"></div>
      <Button
        text="완료"
        onClick={handleCompleteButton}
        disabled={keywords.length === 0}
      />
      <button
        className="w-full transition h-[52px] text-xs underline border border-transparent hover:[#F5535D]-2 px-0 text-[#999999] leading-3 font-normal"
        onClick={handleSubmit}
      >
        다음에 할래요
      </button>
    </Layout>
  );
}

export default Join02;
