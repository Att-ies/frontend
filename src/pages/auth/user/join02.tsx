import Layout from '@components/common/Layout';
import Button from '../../../components/common/Button';
import Navigate from '@components/common/Navigate';
import { useRouter } from 'next/router';
import react, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import userSlice, { setTastes } from '@features/user/userSlice';
import ErrorMessage from '@components/common/ErrorMessage';
import Modal from '@components/common/Modal';
import { memberInfoForm } from 'types/userInfo';
import authApi from '@apis/auth/authApi';

interface TasteForm {
  id: string;
  name: string;
}

const TASTES: TasteForm[] = [
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
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/user/join01');
  };
  const [isModal, setIsModal] = useState<boolean>(false);
  const [tasteSelected, setTasteSelected] = useState<string[]>([]);
  const userState = useAppSelector((state: { user: any }) => state.user);
  const checkTaste = (e: { target: { id: any } }) => {
    const thisId = e.target.id;
    if (tasteSelected.includes(thisId)) {
      setTasteSelected(
        tasteSelected.filter((taste: string) => taste !== thisId + ''),
      );
    } else {
      setTasteSelected([...tasteSelected, thisId]);
    }
  };

  const handleSubmit = async () => {
    const tasteSelectedArr = [...tasteSelected];
    tasteSelectedArr.sort((a: number, b: number) => +a - +b);
    const memberInfo: memberInfoForm = {
      userId: userState.userId,
      nickname: userState.nickname,
      password: userState.password,
      telephone: userState.telephone,
      email: userState.email,
      keywords: tasteSelectedArr,
    };
    const response = await authApi.postAuth(memberInfo);
    if (response.status === 200) {
      router('/auth/login');
    } else if (response.status === 409) {
      switch (response.data.code) {
        case 'EXIST_USER_ID':
          setErrorMessage('존재하는 아이디입니다.');
          break;
        case 'EXIST_USER_EMAIL':
          setErrorMessage('존재하는 이메일입니다.');
          break;
        case 'EXIST_NICKNAME':
          setErrorMessage('존재하는 닉네임입니다.');
          break;
      }
    }
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
          moreClassName="absolute left-[100px] top-[850px]"
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
      <div className="flex flex-wrap py-10 text-[#767676]">
        {TASTES.map((taste: TasteForm) =>
          tasteSelected.includes(taste.id) ? (
            <div
              key={taste.id}
              id={taste.id}
              className="h-[28px] text-[14px] flex justify-center items-center border rounded-[14px] my-2 mx-1 px-2.5 cursor-pointer bg-[white] border-[#F5535D] font-bold"
              onClick={checkTaste}
            >
              {taste.name}
            </div>
          ) : (
            <>
              <div
                key={taste.id}
                id={taste.id}
                className="h-[28px] text-[14px] flex justify-center items-center border rounded-[14px] my-2 mx-1 px-2.5 cursor-pointer font-bold"
                onClick={checkTaste}
              >
                {taste.name}
              </div>
            </>
          ),
        )}
      </div>
      <div className="h-[400px]"></div>
      <Button
        text="완료"
        onClick={handleCompleteButton}
        disabled={!tasteSelected.length}
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
