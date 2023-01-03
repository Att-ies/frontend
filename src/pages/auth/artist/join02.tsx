import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import camera from '@public/svg/icons/icon_camera.svg';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setArtistInfo } from '@features/user/userSlice';
import ErrorMessage from '@components/common/ErrorMessage';

interface defaultProps {
  [key: string]: any;
}

const ProfilePicBox = tw.div<defaultProps>`
w-[100px] h-[100px] mx-auto rounded-full text-center mt-8 cursor-pointer
`;

const UserSNSBox = tw.div<defaultProps>`
flex cursor-pointer flex items-center text-12
`;

interface ArtistProfileForm {
  profile?: FileList;
  history: string;
  education: string;
  description: string;
  instagram: string;
  behance: string;
}

export default function Join02() {
  const router = useRouter();
  const [profilePreview, setProfilePreview] = useState('');
  const { handleSubmit, formState, watch, register } =
    useForm<ArtistProfileForm>();
  const [isProfileError, setIsProfileError] = useState<boolean>(false);
  const profile = watch('profile');
  const userState = useAppSelector((state: { user: any }) => state.user);

  useEffect(() => {
    if (profile && profile.length > 0) {
      const file = profile[0];
      setProfilePreview(URL.createObjectURL(file));
    }
  }, [profile]);

  const onSubmit = (form: ArtistProfileForm) => {
    const { userId, username, password, telephone, email } = userState;
    const { profile, education, history, description, instagram, behance } =
      form;
    if (!profile.length) {
      setIsProfileError(true);
      return;
    } else {
      setIsProfileError(false);
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('telephone', telephone);
    formData.append('email', email);

    formData.append('image', profile[0]);
    formData.append('education', education);
    formData.append('history', history);
    formData.append('description', description);
    formData.append('instagram', instagram || '');
    formData.append('behance', behance || '');

    console.log('회원가입 API');
    // 아래처럼 multipart형식으로 회원가입 API 전송
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    // data: formData,
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
          {isProfileError && (
            <span className="text-14 text-[#FF3120] absolute left-[100px] top-[250px]">
              프로필 사진을 추가해주세요
            </span>
          )}
        </label>
      </section>
      <section className="mt-8 w-full flex flex-col justify-center items-center">
        <div className="font-bold">김영서</div>
        <div className="text-[#999999]">noniuxui@naver.com</div>
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
              required: true,
            })}
          />
          <Input
            type="text"
            label="작가소개"
            placeholder="한 줄 소개를 작성해주세요."
            register={register('description', {
              required: true,
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
