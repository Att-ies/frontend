import authApi from '@apis/auth/authApi';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface passwordForm {
  password: string;
  passwordConfirm: string;
}

export default function Password() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<passwordForm>({ mode: 'onTouched' });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const onSubmit = async () => {
    if (watch('password') !== watch('passwordConfirm')) {
      setError(
        'passwordConfirm',
        {
          type: 'password inCorrect',
          message: '비밀번호가 일치하지 않습니다.',
        },
        { shouldFocus: true },
      );
      return;
    }
    console.log(watch('password'));
    const response = await authApi.postPassword(watch('password'));
    console.log(response);
  };
  const handleLeftButton = () => {
    router.push('/profile');
  };
  return (
    <Layout>
      <Navigate
        message="비밀번호 변경"
        right_message="완료"
        handleRightButton={handleSubmit(onSubmit)}
        handleLeftButton={handleLeftButton}
      />
      <div className="relative   ">
        <Input
          label="비밀번호"
          placeholder="비밀번호"
          type={showPassword ? 'text' : 'password'}
          register={register('password', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9]{8,15}$/,
              message: '영문+숫자 조합 8자리 이상 입력해주세요.',
            },
          })}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
        <Image
          alt="eye"
          src={`/svg/icons/icon_eye${showPassword ? '_on' : ''}.svg`}
          width="25"
          height="0"
          className="absolute right-2 top-12"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </div>
      <div className="relative">
        <Input
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          type={showPasswordConfirm ? 'text' : 'password'}
          register={register('passwordConfirm', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9]{8,15}$/,
              message: '영문+숫자 조합 8자리 이상 입력해주세요.',
            },
          })}
        />
        {errors.passwordConfirm && (
          <ErrorMessage message={errors.passwordConfirm.message} />
        )}
        <Image
          alt="eye"
          src={`/svg/icons/icon_eye${showPasswordConfirm ? '_on' : ''}.svg`}
          width="25"
          height="0"
          className="absolute right-2 top-12"
          onClick={() => {
            setShowPasswordConfirm(!showPasswordConfirm);
          }}
        />
      </div>
    </Layout>
  );
}
