import authApi from '@apis/auth/authApi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setArtistInfo } from '@features/user/userSlice';
import camera from '@public/svg/icons/icon_camera.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';

interface DefaultProps {
  [key: string]: any;
}

const ProfilePicBox = tw.div<DefaultProps>`
w-[100px] h-[100px] mx-auto rounded-full text-center mt-8 cursor-pointer
`;

const UserSNSBox = tw.div<DefaultProps>`
flex cursor-pointer flex items-center text-12
`;

interface ArtistProfileForm {
  profile?: any;
  history: string;
  education: string;
  description: string;
  instagram: string;
  behance: string;
}

export default function Join02() {
  const router = useRouter();
  const [profilePreview, setProfilePreview] = useState('');
  const { handleSubmit, watch, register } = useForm<ArtistProfileForm>();
  const profile = watch('profile');
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (profile && profile.length > 0) {
      const file = profile[0];
      setProfilePreview(URL.createObjectURL(file));
    }
  }, [profile]);

  const onSubmit = async (form: ArtistProfileForm) => {
    const { userId, nickname, password, telephone, email } = userState;
    const { profile, education, history, description, instagram, behance } =
      form;

    dispatch(
      setArtistInfo({ education, history, description, instagram, behance }),
    );

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('telephone', telephone);
    formData.append('email', email);

    formData.append('image', profile[0]);
    formData.append('education', education);
    formData.append('history', history);
    formData.append('description', description);
    formData.append('instagram', instagram);
    formData.append('behance', behance);

    const response = await authApi.postArtistAuth(formData);
    console.log(response);
    if (response.status === 201) {
      router.push('/auth/login');
    } else if (response.status === 409) {
      router.push('/auth/join');
    }
  };
  return (
    <Layout>
      <Navigate
        message="작가프로필"
        isRightButton={false}
        handleLeftButton={() => {
          router.push('/auth/artist/join01');
        }}
      />
      <section>
        <label htmlFor="picture">
          <ProfilePicBox
            className={`relative ${
              profilePreview
                ? 'border-none overflow-hidden'
                : 'border-[1.5px] border-[#999999]'
            }`}
          >
            {profilePreview ? (
              <Image
                className="m-auto rounded-full "
                src={profilePreview}
                alt="profile_preview"
                width={100}
                height={100}
              />
            ) : (
              <Image
                className="m-auto h-full"
                src="/svg/icons/profile/icon_avatar.svg"
                alt="profile"
                width="50"
                height="0"
              />
            )}
            {!profilePreview && (
              <ProfilePicBox className="w-[26px] h-[26px] z-10 bg-[#575757] absolute bottom-1 right-0">
                <Image className="m-auto h-full" src={camera} alt="camera" />
              </ProfilePicBox>
            )}
          </ProfilePicBox>
          <input
            {...register('profile')}
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </section>
      <section className="mt-8 w-full flex flex-col justify-center items-center">
        <div className="font-bold">{userState.nickname}</div>
        <div className="text-[#999999]">{userState.email}</div>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="mt-[30px]">
          <Input
            type="text"
            label="학력"
            placeholder="학교와 학위, 전공 등을 입력해주세요."
            register={register('education', {
              required: true,
            })}
          />

          <Input
            type="text"
            className="mb-2"
            label="이력"
            placeholder="이력을 작성해주세요."
            register={register('history', {
              required: false,
            })}
          />
          <Input
            type="text"
            label="작가소개"
            placeholder="한 줄 소개를 작성해주세요."
            register={register('description', {
              required: false,
            })}
          />
        </section>
        <section className="mt-3 flex">
          <UserSNSBox>
            <Image
              src="/svg/icons/icon_instagram_gray.svg"
              width={20}
              height={20}
              alt="instagram"
            />
            <input
              type="text"
              placeholder="인스타그램 추가하기"
              className="ml-1 text-12 border-none h-[20px] w-[120px] p-0 flex items-center placeholder:text-[#999]"
              {...register('instagram', {
                required: false,
              })}
            />
            {/* <span >인스타그램 추가하기</span> */}
          </UserSNSBox>
          <UserSNSBox className="ml-4">
            <Image
              src="/svg/icons/icon_behance_gray.svg"
              width={20}
              height={20}
              alt="behance"
            />
            <input
              type="text"
              placeholder="비헨스 추가하기"
              className="ml-1 text-12 border-none h-[20px] w-[120px] p-0 flex items-center placeholder:text-[#999]"
              {...register('behance', {
                required: false,
              })}
            />
          </UserSNSBox>
        </section>
        <Button className="absolute bottom-[83px] w-[325px]" text="완료" />
      </form>
    </Layout>
  );
}
