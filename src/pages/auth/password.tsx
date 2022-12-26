import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { useRouter } from 'next/router';
import React from 'react';

function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = () => {
    console.log(watch('password'));
  };
  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/login');
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };
  console.log(watch('password'), watch('age'));
  return (
    <Layout>
      <Navigate
        message="비밀번호 찾기"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <section className="py-7">
        <p className="text-16">
          소중한 개인정보를 위하여 <br />
          <span className="text-[#F5535D]">본인확인</span>이 필요합니다.
        </p>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="py-2">
          <Input
            placeholder="example@naver.com"
            className="placeholder:underline"
            {...register('password', { required: true })}
          />
          <input {...register('age')} />
        </section>
        <section className="text-12 text-[#999999]">
          가입하신 이메일 주소를 입력해주시면 새로운 비밀번호를 설정 가능한
          링크를 보내드립니다.
        </section>
        {errors.id && <span className="">This field is required</span>}
        <div className="h-[400px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}

export default Password;
