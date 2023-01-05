import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Modal from '@components/common/Modal';
import ErrorMessage from '@components/common/ErrorMessage';
import authApi from '@apis/auth/authApi';

interface NewPasswordForm {
  email: string;
}

function Password() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewPasswordForm>();
  const [isModal, setIsModal] = useState(false);
  const onSubmit = async ({ email }: NewPasswordForm) => {
    if (email) {
      const data = await authApi.postNewPassword({
        email,
      });

      if (data.status === 200) {
        setIsModal(true);
      } else if (data.status === 404 && data.error === 'NOT_FOUND') {
        setError('email', {
          type: 'not found',
          message: data.detail,
        });
      }
      console.log(data);
    }
  };

  const router = useRouter();
  const handleLeftButton = () => {
    router.push('/auth/login');
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };
  const onCloseModal = () => {
    setIsModal(false);
  };

  return (
    <Layout>
      {isModal && (
        <Modal
          isModal={isModal}
          onCloseModal={onCloseModal}
          message="임시 비밀번호를 전송했습니다."
        />
      )}
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
            type="email"
            placeholder="example@naver.com"
            className="placeholder:underline"
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
        <section className="text-12 text-[#999999]">
          이메일 주소를 입력해주시면 임시 비밀번호를 보내드립니다.
        </section>

        <div className="h-[400px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}

export default Password;
