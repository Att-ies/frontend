import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import DoubleCheckButton from '@components/common/DoubleCheckButton';
import authApi from '@apis/auth/authApi';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isUser } from '@utils/isUser';
import useGetProfile from '@hooks/queries/useGetProfile';
import Loader from '@components/common/Loader';
import { makeBlob } from '@utils/makeBlob';

export default function Edit() {
  const [isNicknameValidate, setIsNicknameValidate] = useState<boolean>(true);
  const [isEmailValidate, setIsEmailValidate] = useState<boolean>(true);
  const { isLoading, userInfo, setUserInfo } = useGetProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<Member>();
  const nickname = watch('nickname');
  const email = watch('email');
  const router = useRouter();

  const handleLeftButton = () => {
    router.push('/profile');
  };

  useEffect(() => {
    setIsEmailValidate(false);
    clearErrors('email');
  }, [email]);
  useEffect(() => {
    setIsNicknameValidate(false);
    clearErrors('nickname');
  }, [nickname]);

  const profile = watch('image');

  console.log(userInfo);

  useEffect(() => {
    if (!profile) return;
    setUserInfo(
      (prev) =>
        ({
          ...prev,
          image: makeBlob(profile[0]),
        } as User),
    );
  }, [profile]);

  const handleDoubleCheckNickName = async () => {
    if (!nickname || !userInfo) return;
    const data = await authApi.getCheckNickname(nickname);
    if (data.status === 409 && nickname !== userInfo.nickname) {
      setError('nickname', {
        type: 'nickname duplicate',
        message: '중복되는 닉네임 입니다.',
      });
      return;
    } else {
      setIsNicknameValidate(true);
      clearErrors('nickname');
    }
  };

  const handleDoubleCheckEmail = async () => {
    if (!email || !userInfo) return;
    const response = await authApi.getCheckEmail(email);

    console.log(response);

    if (response.status === 409 && email !== userInfo.email) {
      setError('email', {
        type: 'email duplicate',
        message: '이미 가입된 이메일 입니다.',
      });
      return;
    } else {
      console.log('이메일 중복체크 성공');
      setIsEmailValidate(true);
      clearErrors('email');
    }
  };

  console.log(userInfo);

  const onSubmit = async (form: Member) => {
    const { nickname, email, instagram, behance } = form;
    if (!nickname || !email) return;
    if (!userInfo) return;
    if (!isNicknameValidate && userInfo.nickname !== form.nickname) {
      setError('nickname', {
        type: 'need nickname duplicate',
        message: '닉네임 중복체크를 해주세요',
      });
      return;
    }
    if (!isEmailValidate && userInfo.email !== form.email) {
      setError('email', {
        type: 'need email duplicate',
        message: '이메일 중복체크를 해주세요',
      });
    }
    const formData = new FormData();

    formData.append('nickname', nickname);
    formData.append('email', email);

    if (profile && profile.length) {
      //유저가 프로필을 변환하였다면
      formData.append('isChanged', 'true');
      formData.append('image', profile[0]);
    } else {
      // 유저가 프로필을 변경하지 않았다면
      formData.append('isChanged', 'false');
      formData.append('image', new File([''], ''));
    }

    if (instagram) formData.append('instagram', instagram);
    if (behance) formData.append('behance', behance);

    const response = await authApi.patchUserInfo(formData);
    console.log(response);
  };

  if (isLoading) return <Loader />;
  return (
    <Layout>
      <Navigate
        right_message="완료"
        left_message={
          <Image
            alt="X"
            src="/svg/icons/icon_close.svg"
            width="18"
            height="0"
          />
        }
        handleLeftButton={handleLeftButton}
        handleRightButton={handleSubmit(onSubmit)}
      />
      <label className="flex justify-center h-[150px]" htmlFor="profile">
        {userInfo?.image ? (
          <Image
            src={userInfo?.image}
            width="120"
            height="0"
            className="rounded-full w-[120px] h-[120px]"
            alt="profile"
          />
        ) : (
          <div className=" flex justify-center items-center w-[99px] h-[99px] rounded-full border-2 border-[#999999] bg-[#FFFFFF] relative">
            <Image
              src="/svg/icons/icon_avatar.svg"
              width="60"
              height="0"
              alt="profile"
            />
            <div className="w-[26px] h-[26px] rounded-full bg-[#575757] flex justify-center items-center absolute right-0 bottom-0">
              <Image
                src="/svg/icons/icon_camera.svg"
                width="15"
                height="0"
                alt="profile"
              />
            </div>
          </div>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="profile"
        className="hidden"
        {...register('image')}
      />

      <section className="relative">
        <Input
          type="text"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요."
          defaultValue={userInfo?.nickname}
          $error={!!errors.nickname}
          register={register('nickname', {
            required: true,
            pattern: {
              value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/i,
              message: '닉네임을 형식에 맞게 입력해주세요.',
            },
          })}
        />
        <DoubleCheckButton
          $valid={!isNicknameValidate}
          onClick={handleDoubleCheckNickName}
          text={isNicknameValidate ? '사용가능' : '중복확인'}
        />
        {errors.nickname && <ErrorMessage message={errors.nickname.message} />}
      </section>
      <section className="relative">
        <Input
          type="text"
          label="이메일"
          defaultValue={userInfo?.email}
          placeholder="이메일을 입력해 주세요."
          $error={!!errors.email}
          register={register('email', {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일을 형식에 맞게 입력해주세요.',
            },
          })}
        />
        <DoubleCheckButton
          $valid={!isEmailValidate}
          onClick={handleDoubleCheckEmail}
          text={isEmailValidate ? '사용가능' : '중복확인'}
        />
        {errors.email ? <ErrorMessage message={errors.email.message} /> : ''}
      </section>

      {!isUser && (
        <section>
          <Input
            type="text"
            label="학력"
            defaultValue={userInfo?.education}
            placeholder="학교와 학위, 전공 등을 입력해 주세요."
            $error={!!errors.education}
            register={register('education', {
              required: true,
            })}
          />
          {errors.education && (
            <ErrorMessage message={errors.education.message} />
          )}

          <Input
            type="text"
            label="이력"
            defaultValue={userInfo?.history}
            placeholder="이력을 작성해 주세요."
            $error={!!errors.history}
            register={register('history', {
              required: true,
            })}
          />
          {errors.history && <ErrorMessage message={errors.history.message} />}
          <Input
            type="text"
            label="작가소개"
            placeholder="소개를 작성해 주세요."
            defaultValue={userInfo?.description}
            $error={!!errors.description}
            register={register('description', {
              required: true,
            })}
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}

          <article className="flex items-center mt-3">
            <label htmlFor="instagram" className="w-8 h-8">
              <Image
                src="/svg/icons/icon_instagram_gray.svg"
                width="20"
                height="20"
                className="mr-1"
                alt="instagram"
              />
            </label>

            <input
              placeholder="인스타그램 추가하기"
              {...register('instagram')}
              id="instagram"
              defaultValue={userInfo?.instagram}
              className="h-[30px] placeholder:text-[#999] text-12 indent-1 "
            />

            <label htmlFor="behance">
              <Image
                src="/svg/icons/icon_behance_gray.svg"
                width="20"
                height="20"
                className="mr-1"
                alt="behance"
              />
            </label>
            <input
              placeholder="비헨스 추가하기"
              {...register('behance')}
              id="behance"
              defaultValue={userInfo?.behance}
              className="h-[30px] placeholder:text-[#999] text-12 indent-1"
            />
          </article>
        </section>
      )}
    </Layout>
  );
}
