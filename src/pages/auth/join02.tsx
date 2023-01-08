import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Navigate from '@components/common/Navigate';
import ErrorMessage from '@components/common/ErrorMessage';
import DoubleCheckButton from '@components/common/DoubleCheckButton';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setUserInfo } from '@features/user/userSlice';
import authApi from '@apis/auth/authApi';

interface JoinForm {
  userId: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  telephone: string;
  email: string;
}

export default function Join02() {
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [idValidation, setIdValidation] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<JoinForm>({ mode: 'onTouched' });

  const id = watch('userId');
  const email = watch('email');

  useEffect(() => {
    setIdValidation(false);
  }, [id]);
  useEffect(() => {
    setEmailValidation(false);
  }, [email]);

  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/join01');
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const onSubmit = async (form: JoinForm) => {
    const { userId, nickname, password, telephone, email } = form;
    if (!idValidation) {
      setError('userId', {
        type: 'id doublecheck',
        message: '아이디 중복확인을 해주세요.',
      });
      return;
    } else if (!emailValidation) {
      setError('email', {
        type: 'email doublecheck',
        message: '이메일 중복확인을 해주세요.',
      });
      return;
    }
    dispatch(
      setUserInfo({
        userId,
        nickname,
        password,
        telephone,
        email,
      }),
    );
    if (userState.isArtist) router.push('/auth/artist/join01');
    else router.push('/auth/user/join01');
  };

  const handleDoubleCheckID = async () => {
    if (!id || id === '') {
      setError('userId', {
        type: 'userId is null',
        message: '아이디를 입력해주세요.',
      });
      return;
    }

    const data = await authApi.getCheckId(id);
    if (data.duplicate) {
      setError('userId', {
        type: 'id duplicate',
        message: '이미 사용중인 아이디 입니다.',
      });
      return;
    } else {
      setIdValidation(true);
      clearErrors('userId');
    }
  };

  const handleDoubleCheckEmail = async () => {
    if (!email || email === '') {
      setError('email', {
        type: 'email is null',
        message: '이메일을 입력해주세요.',
      });
      return;
    }

    const data = await authApi.getCheckEmail(email);
    if (data.duplicate) {
      setError('email', {
        type: 'email duplicate',
        message: '이미 가입된 이메일 입니다.',
      });
      return;
    } else {
      setEmailValidation(true);
      clearErrors('email');
    }
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
        {/* 유저 아이디 */}
        <section className="mb-3 relative">
          <Input
            type="text"
            label="ID"
            placeholder="영문+숫자 조합 5자리 이상 입력해주세요."
            $error={errors.userId ? true : false}
            register={register('userId', {
              required: true,
              pattern: {
                value: /^[a-z]+[a-z0-9]{5,19}$/g,
                message: '아이디 형식에 맞게 입력해주세요.',
              },
            })}
          />
          <DoubleCheckButton
            $valid={!idValidation}
            onClick={handleDoubleCheckID}
            text={idValidation ? '사용가능' : '중복확인'}
          />
          {errors.userId && <ErrorMessage message={errors.userId.message} />}
        </section>

        {/* 유저이름 */}
        <section className="mb-3 relative">
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            $error={errors.nickname ? true : false}
            register={register('nickname', {
              required: true,
              pattern: {
                value: /^[가-힣A-Za-z0-9]{1,5}$/g,
                message: '최대 5자 까지 입력 가능합니다.',
              },
            })}
          />
          {errors.nickname && (
            <ErrorMessage message={errors.nickname.message} />
          )}
        </section>

        {/* 비밀번호 */}
        <section className="mb-3">
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문+숫자 조합 8자리 이상 입력해주세요."
            $error={errors.password ? true : false}
            register={register('password', {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9]{8,15}$/,
                message: '비밀번호를 형식에 맞게 입력해주세요.',
              },
            })}
            className="mb-0"
          />
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            $error={errors.confirmPassword ? true : false}
            register={register('confirmPassword', {
              required: true,
              validate: (value: string) => {
                if (watch('password') !== value)
                  return '비밀번호가 일치하지 않습니다.';
              },
            })}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message} />
          )}
          {errors.confirmPassword && !errors.password && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
        </section>

        {/* 휴대폰 번호 */}
        <section className="mb-3">
          <Input
            type="text"
            label="휴대폰 번호"
            placeholder="-를 제외하고 입력해주세요."
            $error={errors.telephone ? true : false}
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

        {/* 이메일 */}
        <section className="mb-3 relative">
          <Input
            type="email"
            label="이메일"
            placeholder="ATTIES@naver.com"
            $error={errors.email ? true : false}
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
          <DoubleCheckButton
            $valid={!emailValidation}
            onClick={handleDoubleCheckEmail}
            text={emailValidation ? '사용가능' : '중복확인'}
          />
        </section>

        <div className="h-[30px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}
