import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Navigate from '@components/common/Navigate';
import ErrorMessage from '@components/common/ErrorMessage';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setUserInfo } from '@features/user/userSlice';
interface JoinForm {
  userId: string;
  username: string;
  password: string;
  confirmPassword: string;
  telephone: string;
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
  const userState = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<JoinForm>();

  const onSubmit = (form: JoinForm) => {
    const { userId, username, password, confirmPassword, telephone, email } =
      form;
    if (password !== confirmPassword) {
      setError(
        'confirmPassword',
        {
          type: 'password inCorrect',
          message: '비밀번호가 일치하지 않습니다.',
        },
        { shouldFocus: true },
      );
      return;
    }
    dispatch(
      setUserInfo({
        userId,
        username,
        password,
        telephone,
        email,
      }),
    );

    if (userState.isArtist) router.push('/auth/artist/join01');
    else router.push('/auth/user/join01');
  };
  const handleDoubleCheckID = () => {
    // ID 중복확인 API
  };
  const handleDoubleCheckEmail = () => {
    // Email 중복확인 API
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
        <section className="mb-3 relative">
          <Input
            type="text"
            label="ID"
            placeholder="영문+숫자 조합 5자리 이상 입력해주세요."
            register={register('userId', {
              required: true,
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: '아이디 형식에 맞게 입력해주세요.',
              },
            })}
          />
          {errors.userId && <ErrorMessage message={errors.userId.message} />}
          <div
            className="w-[58px] h-[25px] text-[#767676] text-12 radius border-2 rounded flex justify-center
            items-center absolute right-[8px] top-[45px] cursor-pointer font-bold"
            onClick={handleDoubleCheckID}
          >
            중복확인
          </div>
        </section>
        <section className="mb-3 relative">
          <Input
            type="text"
            label="사용자 이름"
            placeholder="이름을 입력해주세요."
            register={register('username', {
              required: true,
              pattern: {
                value: /^[가-힣]{2,25}$/g,
                message: '최대 한글25자까지 입력 가능합니다.',
              },
            })}
          />
          {errors.username && (
            <ErrorMessage message={errors.username.message} />
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
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            register={register('confirmPassword', {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9]{8,15}$/,
                message: '비밀번호를 형식에 맞게 입력해주세요.',
              },
            })}
            className="rounded-t-none  focus:border-t "
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
        </section>
        <section className="mb-3">
          <Input
            type="text"
            label="휴대폰 번호"
            placeholder="번호를 입력해주세요"
            register={register('telephone', {
              required: true,
              pattern: {
                value: /^01([0|1|6|7|8|9])[0-9]{4}[0-9]{4}$/g,
                message: '휴대폰번호를 정확히 입력해주세요.',
              },
            })}
          />
          {errors.telephone && (
            <ErrorMessage message={errors.telephone.message} />
          )}
        </section>
        <section className="mb-3 relative">
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
          )}{' '}
          <div
            className="w-[58px] h-[25px] text-[#767676] text-12 radius border-2 border-[#767676] rounded flex justify-center
          items-center absolute right-[8px] top-[45px] cursor-pointer font-bold"
            onClick={handleDoubleCheckEmail}
          >
            중복확인
          </div>
        </section>
        <div className="h-[30px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}
