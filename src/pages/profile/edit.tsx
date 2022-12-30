import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MessageForm {
  name: string;
  email: string;
  education: string;
  recold: string;
  introduce: string;
  instagram: string;
  bahance: string;
}

let role = 'artist';

export default function Edit() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<MessageForm>();
  const [imageFile, setImageFile] = useState(null);

  const profileImage = watch('image');
  useEffect(() => {
    if (profileImage && profileImage.length > 0) {
      const file = profileImage[0];
      setImageFile(URL.createObjectURL(file));
    }
  }, [profileImage]);

  const onLeftButton = () => {
    router.push('/profile');
  };
  const onSubmit = (form: MessageForm) => {
    console.log(watch('image')[0]);
    // 채팅 API전송
  };

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
        handleLeftButton={onLeftButton}
        handleRightButton={handleSubmit(onSubmit)}
      />
      <label className="flex justify-center h-[150px]" htmlFor="profileImage">
        {imageFile ? (
          <Image
            src={imageFile}
            width="120"
            height="0"
            className="rounded-full w-[120px] h-[120px]"
            alt="profile"
          />
        ) : (
          <div className=" flex justify-center items-center w-[99px] h-[99px] rounded-full border-2 border-[#999999] bg-[#FFFFFF] relative">
            <Image
              src="/svg/icons/icon_avartar.svg"
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
                className=""
              />
            </div>
          </div>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="profileImage"
        className="hidden"
        {...register('image')}
      />
      <section className="">
        <Input
          label="닉네임"
          placeholder="닉네임을 입력해 주세요."
          register={register('name', {
            required: true,
            pattern: {
              value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/i,
              message: '닉네임을 형식에 맞게 입력해주세요.',
            },
          })}
        />
        {errors.name ? <ErrorMessage message={errors.name.message} /> : ''}
        <Input
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          register={register('email', {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일을 형식에 맞게 입력해주세요.',
            },
          })}
        />
        {errors.email ? <ErrorMessage message={errors.email.message} /> : ''}
      </section>

      {role === 'artist' && (
        <section>
          <Input
            label="학력"
            placeholder="학교와 학위, 전공 등을 입력해 주세요."
            register={register('education', {
              required: true,
            })}
          />
          {errors.education && (
            <ErrorMessage message={errors.education.message} />
          )}

          <Input
            label="이력"
            placeholder="이력을 작성해 주세요."
            register={register('recold', {
              required: true,
            })}
          />
          {errors.recold && <ErrorMessage message={errors.recold.message} />}
          <Input
            label="작가소개"
            placeholder="소개를 작성해 주세요."
            register={register('introduction', {
              required: true,
            })}
          />
          {errors.introduction && (
            <ErrorMessage message={errors.introduction.message} />
          )}

          <article className="flex items-center mt-3">
            <label htmlFor="instagram">
              <Image
                src="/svg/icons/icon_instagram.svg"
                width="22"
                height="10"
                className="mr-1"
              />
            </label>
            <input
              placeholder="인스타그램 추가하기"
              {...register('instagram')}
              id="instagram"
              className="h-[30px] placeholder:text-[#999] text-12 indent-1 "
            />

            <label htmlFor="behance">
              <Image
                src="/svg/icons/icon_behance.svg"
                width="20"
                height="0"
                className="mr-1"
              />
            </label>
            <input
              placeholder="비헨스 추가하기"
              {...register('behance')}
              id="behance"
              className="h-[30px] placeholder:text-[#999] text-12 indent-1"
            />
          </article>
        </section>
      )}
    </Layout>
  );
}
