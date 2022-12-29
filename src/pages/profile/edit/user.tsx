import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MessageForm {
  name: string;
  email: string;
}

export default function EditUser() {
  const imgRef = useRef();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageForm>();
  const [imageFile, setImageFile] = useState(null);

  const saveImageFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  const onLeftButton = () => {
    router.push('/profile');
  };

  const onSubmit = (form: MessageForm) => {
    console.log(form, imgRef.current.files[0]);
    // 채팅 API전송
  };

  return (
    <Layout>
      <Navigate
        right_message="완료"
        left_message="X"
        handleLeftButton={onLeftButton}
        handleRightButton={handleSubmit(onSubmit)}
      />

      <label className="flex justify-center " htmlFor="profileImage">
        {imageFile ? (
          <Image
            src={imageFile}
            width="120"
            height="0"
            className="rounded-full w-[120px] h-[120px]"
            alt="profile"
          />
        ) : (
          <Image
            src="/svg/icons/icon_basic_profile_fill.svg"
            width="120"
            height="0"
            alt="profile"
          />
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="profileImage"
        className="hidden"
        ref={imgRef}
        onChange={saveImageFile}
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
    </Layout>
  );
}
