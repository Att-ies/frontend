import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import CheckBox from '@components/common/Checkbox';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Button from '@components/common/Button';
import AuthApi from '@apis/auth/authApi';
import ErrorMessage from '@components/common/ErrorMessage';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = (data: any) => {
    const { id, password } = data;
    console.log(id, password);
    if (false) {
      // 비밀번호 일치하지 않을 경우
      setError(
        'password',
        {
          type: 'incorrect',
          message: '비밀번호가 일치하지 않습니다.',
        },
        { shouldFocus: true },
      );
    }
    // 로그인 API
  };
  const handleNaverLogin = async () => {
    // Naver 로그인 API
  };
  const handleKakaoLogin = async () => {
    // Kakao 로그인 API
  };
  return (
    <Layout>
      <div className="mx-auto w-full">
        <div className="text-center text-2xl font-light mt-12">LOGO</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-36 ">
            <Input
              type="text"
              id="id"
              placeholder="아이디를 입력해 주세요."
              register={register('id', { required: true })}
            />
            {errors.id && <ErrorMessage message={errors.id.message} />}
          </div>
          <div className="flex flex-col mt-[10px] justify-start">
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              register={register('password', {
                required: true,
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="flex space-x-[22px] mt-[14px]">
            <CheckBox kind="radio" label="자동 로그인" />
            <CheckBox kind="radio" label="아이디 저장" />
          </div>
          <div className="mt-[34px]">
            <Button text="로그인" />
          </div>
          <div className="flex justify-around items-center mt-[29px] text-12">
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={handleNaverLogin}
            >
              <Image
                src="/svg/social/naver_logo.svg"
                alt="kakao"
                width={18}
                height={18}
              />
              <span className="ml-[10px]">네이버</span>
            </div>
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={handleKakaoLogin}
            >
              <Image
                src="/svg/social/kakao_logo.svg"
                alt="kakao"
                width={18}
                height={18}
              />
              <span className="ml-[10px]">카카오톡</span>
            </div>
          </div>
          <p className="w-full text-center text-12 mt-[29px]">
            계정을 잊으셨나요?&nbsp;
            <Link className="text-[#0099FF]" href="/auth/id">
              ID찾기
            </Link>
            &nbsp;또는&nbsp;
            <Link className="text-[#0099FF]" href="/auth/password">
              비밀번호 찾기
            </Link>
          </p>
          <p className="flex justify-center items-center w-full text-12 mt-44">
            <span className="text-[#999999]">아직 회원이 아니신가요?</span>
            <Link className="ml-[2px]" href="/auth/join">
              회원가입
            </Link>
            <Image
              src="/svg/icons/icon_front.svg"
              alt="join"
              width={12}
              height={12}
            />
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
