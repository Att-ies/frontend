import ErrorMessage from '@components/common/ErrorMessage';
import Layout from '@components/common/Layout';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';
import { User } from 'types/user';

import Button from '../../components/common/Button';
import useUserJoin from '../../hooks/queries/useUserJoin';

interface Member extends User {
  keywords: string[];
}

function Join03() {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const handleNextButton = () => {
    router.push('/auth/join04');
  };
  const { mutation, errorMessage } = useUserJoin();
  const handleSkipButton = async () => {
    const memberInfo: Member = {
      userId: userState.userId,
      nickname: userState.nickname,
      password: userState.password,
      telephone: userState.telephone,
      email: userState.email,
      keywords: [],
    };
    mutation.mutate(memberInfo);
  };
  return (
    <Layout>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          className="absolute left-[100px] top-[620px]"
        />
      )}
      <div className="text-18 ">
        <span className="text-[#F5535D] font-bold ">취향 분석</span>을 통해
        <br />
        나에게 <span className="font-bold">딱 맞는</span> <br />
        작품을 추천 받아보세요
      </div>
      <div className="h-[400px] flex justify-center items-center">IMG</div>
      <Button text="분석 시작" className="" onClick={handleNextButton} />
      <button
        className="w-full transition h-[52px] text-xs underline border border-transparent hover:[#F5535D]-2 px-0 text-[#999999] leading-3 font-normal"
        onClick={handleSkipButton}
      >
        다음에 할래요
      </button>
    </Layout>
  );
}

export default Join03;
