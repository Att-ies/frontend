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
interface FindIdForm {
  nickname: string;
  email: string;
}

function Id() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FindIdForm>();
  const [isModal, setIsModal] = useState(false);

  const onSubmit = async ({ nickname, email }: FindIdForm) => {
    if (nickname && email) {
      const data = await authApi.postFindId({
        nickname,
        email,
      });
      if (data.status === 200) {
        setIsModal(true);
      } else if (data.status === 404 && data.error === 'NOT_FOUND') {
        setError('email', {
          type: 'not found',
          message: data.detail,
        });
      } else if (data.status === 404 && data.error === 'NOT_MATCH_USERNAME') {
        setError('nickname', {
          type: 'not match username',
          message: data.detail,
        });
      }
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
          message="입력하신 주소로 확인 메일을 보내드렸습니다."
        />
      )}
      <Navigate
        message="아이디 찾기"
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
            type="text"
            placeholder="성함을 입력해 주세요."
            register={register('nickname', {
              required: true,
              pattern: {
                value: /^[가-힣]{2,4}$/,
                message: '이름을 올바르게 입력해주세요.',
              },
            })}
            className="mb-2"
          />
          {errors.nickname && (
            <ErrorMessage message={errors.nickname.message} />
          )}

          <Input
            type="email"
            placeholder="이메일을 입력해주세요. (@포함)"
            register={register('email', {
              required: true,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일을 형식에 맞게 입력해주세요.',
              },
            })}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </section>
        <div className="h-[400px]" />
        <section>
          <Button text="확인" type="submit" />
        </section>
      </form>
    </Layout>
  );
}

export default Id;
