import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Member } from 'types/user';

import Button from '../../components/common/Button';
import useUserJoin from '../../hooks/queries/useUserJoin';

interface KeywordForm {
  id: string;
  name: string;
}

const KEYWORDS: KeywordForm[] = [
  { id: '1', name: '유화' },
  { id: '2', name: '심플한' },
  { id: '3', name: '세련된' },
  { id: '4', name: '모던한' },
  { id: '6', name: '서양화' },
  { id: '5', name: '변화의' },
  { id: '7', name: '비판적인' },
  { id: '8', name: '동양화' },
  { id: '9', name: '미디어아트' },
  { id: '10', name: '풍경화' },
  { id: '11', name: '화려한' },
  { id: '12', name: '판화' },
  { id: '13', name: '사진' },
  { id: '14', name: '소묘' },
  { id: '15', name: '파스텔' },
  { id: '16', name: '추상화' },
  { id: '17', name: '자유로운' },
  { id: '18', name: '다양한' },
  { id: '19', name: '개성적인' },
  { id: '20', name: '새로운' },
  { id: '21', name: '한국적인' },
  { id: '22', name: '강한' },
  { id: '23', name: '거친' },
  { id: '24', name: '율동적인' },
  { id: '25', name: '편안한' },
  { id: '26', name: '포근한' },
  { id: '27', name: '자연적인' },
  { id: '28', name: '다이나믹한' },
  { id: '29', name: '서양적인' },
];

export default function Join04() {
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
    console.log(memberInfo);
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
            } w rounded-full flex justify-center items-center px-2.5 py-1.5 border mr-2 mb-2 cursor-pointer text-14 text-[#767676]`}
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
