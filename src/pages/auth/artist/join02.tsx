import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import profile from '@public/svg/icons/icon_avatar.svg';
import camera from '@public/svg/icons/icon_camera.svg';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  record: string;
  artist_profile: string;
  avatar?: FileList;
}

export default function Join02() {
  const [avatarPreview, setAvatarPreview] = useState('');

  const { watch, register } = useForm<ArtistProfileForm>();
  const avatar = watch('avatar');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  const router = useRouter();
  return (
    <Layout>
      <Navigate message="작가프로필" right_message=" "></Navigate>
      <section>
        <label htmlFor="picture">
          <ProfilePicBox
            className={`relative ${
              avatarPreview
                ? 'border-none overflow-hidden'
                : 'border-[1.5px] border-[#999999]'
            }`}
          >
            {avatarPreview ? (
              <Image
                className="m-auto rounded-full "
                src={avatarPreview}
                alt="avatar_preview"
                width={100}
                height={100}
              />
            ) : (
              <Image className="m-auto h-full" src={profile} alt="profile" />
            )}

            {avatarPreview ? (
              ''
            ) : (
              <ProfilePicBox className="w-[26px] h-[26px] z-10 bg-[#575757] absolute bottom-1 right-0">
                <Image className="m-auto h-full" src={camera} alt="camera" />
              </ProfilePicBox>
            )}
          </ProfilePicBox>
          <input
            {...register('avatar')}
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </section>
      <section className="mt-8 w-full flex flex-col justify-center items-center">
        <div className="font-bold">김영서</div>
        <div className="text-[#999999]">noniuxui@naver.com</div>
      </section>
      <section className="mt-[30px]">
        <Input
          type="text"
          label="학력"
          placeholder="학교와 학위, 전공 등을 입력해주세요."
        />

        <Input
          className="mb-2"
          type="text"
          label="이력"
          placeholder="이력을 작성해주세요."
        />
        <Input
          type="text"
          label="작가소개"
          placeholder="한 줄 소개를 작성해주세요."
        />
      </section>
      <section className="mt-3 flex">
        <UserSNSBox>
          <Image
            src="/svg/icons/icon_instagram.svg"
            width={20}
            height={20}
            alt="instagram"
          />
          <span className="text-[#999999] ml-1">인스타그램 추가하기</span>
        </UserSNSBox>
        <UserSNSBox className="ml-4">
          <Image
            src="/svg/icons/icon_behance.svg"
            width={20}
            height={20}
            alt="behance"
          />
          <span className="text-[#999999] ml-1">비헨스 추가하기</span>
        </UserSNSBox>
      </section>
      <Button
        onClick={() => router.push('/home')}
        className="absolute bottom-[83px] w-[325px]"
        text="완료"
      />
    </Layout>
  );
}
