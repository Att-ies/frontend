import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Navigate from '@components/common/Navigate';
import ErrorMessage from '@components/common/ErrorMessage';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@features/hooks';
import {
  setEmail,
  setId,
  setPassword,
  setTel,
  setUsername,
} from '@features/user/userSlice';
interface JoinForm {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
  tel: string;
  email: string;
}

export default function Join02() {
  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/join01');
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinForm>();

  const onSubmit = (form: JoinForm) => {
    const { id, username, password, tel, email } = form;
    dispatch(setId(id));
    dispatch(setUsername(username));
    dispatch(setPassword(password));
    dispatch(setTel(tel));
    dispatch(setEmail(email));
    router.push('/auth/join03');
  };

  return (
    <Layout>
      <Navigate
        message="회원가입"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <section className="mt-8">
        <p className="mb-[12px]">
          <span className="text-[#F5535D]">회원정보</span>를 입력해주세요
        </p>
      </section>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-3">
          <Input
            type="text"
            label="ID"
            placeholder="아이디를 입력해주세요."
            register={register('id', { required: true })}
          />
        </section>
        {errors.id && <ErrorMessage message="이미 사용중인 아이디입니다." />}
        <section className="mb-3">
          <Input
            type="text"
            label="사용자 이름"
            placeholder="이름을 입력해주세요."
            register={register('username', { required: true })}
          />
          {errors.username && (
            <ErrorMessage message="최대 한글 25자 까지 입력 가능합니다." />
          )}
        </section>
        <section className="mb-3">
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문+숫자 조합 8자리 이상 입력해주세요."
            register={register('password', {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9]{8,15}$/,
                message: '비밀번호를 형식에 맞게 입력해주세요.',
              },
            })}
            className="rounded-b-none focus:translate-y-[-1px]"
          />
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            register={register('confirmPassword', {
              required: true,
              validate: (value: string) => {
                if (watch('password') !== value) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            })}
            className="rounded-t-none border-t-0 focus:border-t"
          />
          {errors.password && errors.confirmPassword ? (
            <ErrorMessage message={errors.password.message} />
          ) : (
            ''
          )}
          {errors.confirmPassword && !errors.password ? (
            <ErrorMessage message={errors.confirmPassword.message} />
          ) : (
            ''
          )}
        </section>
        <section className="mb-3">
          <Input
            type="text"
            label="휴대폰 번호"
            placeholder="번호를 입력해주세요"
            register={register('tel', {
              required: true,
              pattern: {
                value: /^01([0|1|6|7|8|9])[0-9]{4}[0-9]{4}$/g,
                message: '휴대폰번호를 정확히 입력해주세요.',
              },
            })}
          />
          {errors.tel && <ErrorMessage message={errors.tel.message} />}
        </section>
        <section className="mb-3">
          <Input
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            register={register('email', {
              required: true,
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          {errors.email && errors.email.message && (
            <ErrorMessage message={errors.email.message} />
          )}
        </section>
        <div className="h-[30px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}
