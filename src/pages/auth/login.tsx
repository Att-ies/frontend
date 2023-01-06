import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import CheckBox from '@components/common/Checkbox';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Button from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';
import React, { useState } from 'react';
import SocialLoginButton from '@components/login/SocialLoginButton';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [checkedTerm, setCheckedTerm] = useState<string[]>([]);
  const onChecked = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedTerm([...checkedTerm, id]);
    } else if (!checked && checkedTerm.includes(id)) {
      setCheckedTerm(checkedTerm.filter((el: string) => el !== id));
    }
  };

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
            <CheckBox
              kind="radio"
              id="term1"
              label="자동 로그인"
              isChecked={checkedTerm.includes('term1')}
              handler={(e) => onChecked(e.target.checked, e.target.id)}
            />
            <CheckBox
              kind="radio"
              label="아이디 저장"
              id="term2"
              isChecked={checkedTerm.includes('term2')}
              handler={(e) => onChecked(e.target.checked, e.target.id)}
            />
          </div>
          <div className="mt-[34px]">
            <Button text="로그인" />
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <SocialLoginButton kind="kakao" />
            </div>
            <div>
              <SocialLoginButton kind="naver" />
            </div>
          </div>
          <p className="w-full text-center text-12 mt-3">
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
