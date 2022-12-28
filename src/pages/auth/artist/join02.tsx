import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import avartar from '@public/svg/icons/icon_avartar.svg';
import camera from '@public/svg/icons/icon_camera.svg';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import { useRouter } from 'next/router';

interface defaultProps {
  [key: string]: any;
}

const ProfilePicBox = tw.div<defaultProps>`
border-[1px] w-[100px] h-[100px] mx-auto rounded-full text-center border-[#999999] mt-[40px] cursor-pointer
`;

const UserSNSBox = tw.div<defaultProps>`
flex cursor-pointer flex items-center text-12
`;

export default function Join02() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate message="작가프로필" right_message=" "></Navigate>
      <section>
        <ProfilePicBox className="relative">
          <Image className="m-auto h-full" src={avartar} alt="avartar" />
          <ProfilePicBox className="w-[26px] h-[26px] bg-[#575757] absolute bottom-1 right-0">
            <Image className="m-auto h-full" src={camera} alt="camera" />
          </ProfilePicBox>
        </ProfilePicBox>
      </section>
      <section className="mt-8 w-full flex flex-col justify-center items-center">
        <div className="font-bold">김영서</div>
        <div className="text-[#999999]">noniuxui@naver.com</div>
      </section>
      <section className="mt-[50px] mb-8">
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
      <section className="mt-8 flex">
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
      />{' '}
    </Layout>
  );
}
