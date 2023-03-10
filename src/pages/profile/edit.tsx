import DoubleCheckButton from '@components/common/DoubleCheckButton';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import useGetProfile from '@hooks/queries/useGetProfile';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { isUser } from '@utils/isUser';
import { makeBlob } from '@utils/makeBlob';
import { useGetDuplicateCheck } from '@hooks/queries/useGetDuplicateCheck';
import { usePatchArtist, usePatchUser } from '@hooks/mutations/usePatchMember';
import Loader from '@components/common/Loader';
import Toast from '@components/common/Toast';
interface checkForm {
  nickname: boolean;
  email: boolean;
}

export default function Edit() {
  const [isValidate, setIsValidate] = useState<checkForm>({
    nickname: false,
    email: false,
  });
  const [toast, setToast] = useState(false);

  const { data } = useGetProfile();
  const [userInfo, setUserInfo] = useState<Member | null>(null);
  const { mutate: mutateUser, isLoading: isPatchUserLoading } = usePatchUser();
  const { mutate: mutateArtist, isLoading: isPatchArtistLoading } =
    usePatchArtist();

  useEffect(() => {
    if (!data) return;
    setUserInfo(data);
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    trigger,
  } = useForm<Member>({ mode: 'onTouched' });
  const nickname = watch('nickname');

  const [enabled, setEnabled] = useState<DuplicateCheck>({
    userId: '',
    nickname: '',
    email: '',
  });
  const results = useGetDuplicateCheck(enabled);
  useEffect(() => {
    setIsValidate((prev) => ({ ...prev, nickname: false }));
    setEnabled((prev) => ({ ...prev, nickname: '' }));
  }, [nickname]);

  const nicknameResult = results[1];
  useEffect(() => {
    if (nicknameResult.isSuccess) {
      setIsValidate((prev) => ({ ...prev, nickname: true }));
      clearErrors('nickname');
    }
    if (
      nicknameResult.error &&
      nicknameResult.error.code === 'EXIST_USER_NICKNAME'
    ) {
      setIsValidate((prev) => ({ ...prev, nickname: false }));
      setError('nickname', {
        type: 'nickname doublecheck',
        message: '?????? ???????????? ????????? ?????????.',
      });
    }
  }, [nicknameResult.isFetching]);

  const router = useRouter();
  const profile = watch('image');

  const handleLeftButton = () => {
    router.push('/profile');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

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

  const onSubmit = async (form: Member) => {
    const {
      nickname,
      instagram,
      behance,
      education,
      history,
      description,
      telephone,
    } = form;
    if (!nickname || !userInfo || !telephone) return;

    if (!isValidate.nickname && userInfo.nickname !== form.nickname) {
      setError('nickname', {
        type: 'need nickname duplicate',
        message: '????????? ??????????????? ????????????',
      });
      return;
    }

    const formData = new FormData();

    formData.append('nickname', nickname);
    formData.append('email', data?.email!);
    formData.append('telephone', telephone);

    if (profile && profile?.length) {
      //????????? ???????????? ??????????????????
      formData.append('isChanged', 'true');
      formData.append('image', profile[0]);
    } else {
      // ????????? ???????????? ???????????? ????????????
      formData.append('isChanged', 'false');
      formData.append('image', new File([''], ''));
    }

    if (!isUser) {
      if (education) formData.append('education', education);
      if (history) formData.append('history', history);
      if (description) formData.append('description', description);

      if (instagram) formData.append('instagram', instagram);
      if (behance) formData.append('behance', behance);
    }

    if (isUser) {
      mutateUser(formData);
      router.replace('/profile');
    } else {
      mutateArtist(formData);
      router.replace({
        pathname: '/profile/detail',
        query: { id: userInfo?.id },
      });
    }
  };
  useEffect(() => {
    if (userInfo && !userInfo?.telephone) {
      setToast(true);
    }
  }, [userInfo]);
  if (isPatchUserLoading || isPatchArtistLoading) return <Loader />;

  return (
    <Layout>
      {toast && (
        <Toast
          text="???????????? ????????? ???????????? ????????? ????????? ???????????????."
          setToast={setToast}
        />
      )}
      <Navigate
        right_message="??????"
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
      <label className="flex h-[120px] justify-center" htmlFor="image">
        {userInfo?.image ? (
          <div className="relative flex h-[99px] w-[99px] cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF]            ">
            <Image
              src={userInfo?.image}
              className="rounded-full object-cover"
              fill
              alt="profile"
            />
            <div className="absolute right-0 bottom-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#575757]">
              <Image
                src="/svg/icons/icon_camera.svg"
                width="15"
                height="0"
                alt="image"
              />
            </div>
          </div>
        ) : data?.image ? (
          <div className="relative flex h-[99px] w-[99px] cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF]            ">
            <Image
              src={data?.image}
              className="rounded-full object-cover"
              fill
              alt="profile"
            />
            <div className="absolute right-0 bottom-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#575757]">
              <Image
                src="/svg/icons/icon_camera.svg"
                width="15"
                height="0"
                alt="image"
              />
            </div>
          </div>
        ) : (
          <div className=" relative flex h-[99px] w-[99px] cursor-pointer items-center justify-center rounded-full border-2 border-[#999999] bg-[#FFFFFF]">
            <Image
              src="/svg/icons/icon_avatar.svg"
              width="60"
              height="0"
              alt="profile"
            />
            <div className="absolute right-0 bottom-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#575757]">
              <Image
                src="/svg/icons/icon_camera.svg"
                width="15"
                height="0"
                alt="profileEdit"
              />
            </div>
          </div>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="image"
        className="hidden"
        {...register('image')}
      />

      <section className="relative">
        <Input
          type="text"
          label="?????????"
          placeholder="???????????? ????????? ?????????."
          defaultValue={userInfo?.nickname}
          $error={!!errors.nickname}
          register={register('nickname', {
            required: true,
            pattern: {
              value: /^[???-???A-Za-z0-9]{1,5}$/g,
              message: '??????, ????????? ???????????? ?????? 5??? ?????? ?????? ???????????????.',
            },
          })}
        />
        <DoubleCheckButton
          $valid={!isValidate.nickname}
          onClick={() => {
            trigger('nickname');
            if (!errors.nickname) {
              setEnabled((prev) => ({ ...prev, nickname: watch('nickname') }));
            }
          }}
          text={isValidate.nickname ? '????????????' : '????????????'}
        />
        {errors.nickname && <ErrorMessage message={errors.nickname.message} />}
      </section>

      <Input
        type="text"
        label="????????? ??????"
        placeholder="-??? ???????????? ??????????????????."
        $error={!!errors.telephone}
        register={register('telephone', {
          required: true,
          pattern: {
            value: /^01([0|1|6|7|8|9])[0-9]{4}[0-9]{4}$/g,
            message: '?????????????????? ????????? ??????????????????.',
          },
        })}
        defaultValue={data?.telephone}
      />

      <Input
        type="text"
        label="?????????"
        disabled
        defaultValue={userInfo?.email}
        placeholder="???????????? ????????? ?????????."
        $error={!!errors.email}
        className="disabled text-[#999999]"
      />

      {!isUser && (
        <section>
          <Input
            type="text"
            label="??????"
            defaultValue={userInfo?.education}
            placeholder="????????? ??????, ?????? ?????? ????????? ?????????."
            $error={!!errors.education}
            register={register('education')}
          />
          {errors.education && (
            <ErrorMessage message={errors.education.message} />
          )}
          <Input
            type="textarea"
            label="??????"
            defaultValue={userInfo?.history}
            placeholder="????????? ????????? ?????????."
            $error={!!errors.history}
            register={register('history')}
          />
          {errors.history && <ErrorMessage message={errors.history.message} />}
          <Input
            type="textarea"
            label="????????????"
            placeholder="????????? ????????? ?????????."
            defaultValue={userInfo?.description}
            $error={!!errors.description}
            register={register('description')}
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
          <article className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="instagram">
                <Image
                  src="/svg/icons/icon_instagram_gray.svg"
                  width="20"
                  height="20"
                  className="mr-1"
                  alt="instagram"
                />
              </label>
              <input
                placeholder="??????????????? ????????????"
                {...register('instagram')}
                id="instagram"
                defaultValue={userInfo?.instagram}
                className="h-[30px] w-[140px] indent-1 text-12 placeholder:text-[#999]"
              />
            </div>
            <div className="flex items-center">
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
                placeholder="????????? ????????????"
                {...register('behance')}
                id="behance"
                defaultValue={userInfo?.behance}
                className="h-[30px] w-[140px] indent-1 text-12 placeholder:text-[#999]"
              />
            </div>
          </article>
        </section>
      )}
    </Layout>
  );
}
