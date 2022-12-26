import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Modal from '@components/common/Modal';

function Id() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isModal, setIsModal] = useState(false);
  const onSubmit = () => {
    console.log(watch('name'), watch('number'));
    setIsModal(true);
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
          message="인증번호를 전송했습니다."
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
            placeholder="성함을 입력해 주세요."
            register={register('name', { required: true })}
            className="mb-2"
          />

          <Input
            placeholder="휴대폰 번호를 입력해주세요."
            register={register('number', { required: true })}
          />
        </section>
        {errors.password && <span className="">This field is required</span>}
        <section className="text-12 text-[#999999]">
          휴대폰 번호를 입력 후 인증번호 받기를 눌러주세요.
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
