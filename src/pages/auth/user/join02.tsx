import Layout from '@components/common/Layout';
import Button from '../../../components/common/Button';
import Navigate from '@components/common/Navigate';
import { useRouter } from 'next/router';
import react, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import userSlice, { setTastes } from '@features/user/userSlice';
import ErrorMessage from '@components/common/ErrorMessage';

const TASTES = [
  { id: 1, name: '심플한' },
  { id: 2, name: '세련된' },
  { id: 3, name: '모던한' },
  { id: 4, name: '서양화' },
  { id: 5, name: '유화' },
  { id: 6, name: '변화의' },
  { id: 7, name: '비판적인' },
  { id: 8, name: '동양화' },
  { id: 9, name: '미디어아트' },
  { id: 10, name: '풍경화' },
  { id: 11, name: '화려한' },
];

function Join02() {
  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/user/join01');
  };
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const [tasteSelected, setTasteSelected] = useState([]);
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

  const handleCancleButton = () => {
    console.log({
      ...userState,
    });
    // 회원가입 API전송
    // router.push('/home');
  };
  const handleCompleteButton = () => {
    const tasteSelectedArr = tasteSelected;
    tasteSelectedArr.sort((a: number, b: number) => +a - +b);
    dispatch(setTastes(tasteSelectedArr));
    console.log({
      ...userState,
      tastes: tasteSelectedArr,
    });
    // 회원가입 API전송
    // router.push('/home');
  };
  return (
    <Layout>
      <Navigate right_message=" " handleLeftButton={handleLeftButton} />
      <div className="text-18 font-semibold">관심있는 키워드를 골라주세요.</div>
      <div className="flex flex-wrap py-10">
        {TASTES.map((taste: any) =>
          tasteSelected.includes(taste.id + '') ? (
            <div
              key={taste.id}
              id={taste.id + ''}
              className="h-[28px] text-[14px] flex justify-center items-center border rounded-[14px] my-2 mx-1 px-2.5 cursor-pointer bg-[#F5535D] text-white"
              onClick={checkTaste}
            >
              {taste.name}
            </div>
          ) : (
            <>
              <div
                key={taste.id}
                id={taste.id + ''}
                className="h-[28px] text-[14px] flex justify-center items-center border rounded-[14px] my-2 mx-1 px-2.5 cursor-pointer"
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
        onClick={handleCancleButton}
      >
        다음에 할래요
      </button>
    </Layout>
  );
}

export default Join02;
