import Layout from '@components/common/Layout';
import Button from '../../../components/common/Button';
import { useRouter } from 'next/router';

function Join01() {
  const router = useRouter();
  const handleNextButton = () => {
    router.push('/auth/user/join02');
  };
  const handleCancleButton = () => {
    router.push('/');
  };
  return (
    <Layout>
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
        onClick={handleCancleButton}
      >
        다음에 할래요
      </button>
    </Layout>
  );
}

export default Join01;
