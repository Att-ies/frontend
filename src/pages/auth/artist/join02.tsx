import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Input from '@components/common/Input';
import avartar from '@public/svg/icons/icon_avartar.svg';
import camera from '@public/svg/icons/icon_camera.svg';
import instagram from '@public/svg/icons/icon_instagram.svg';
import behance from '@public/svg/icons/icon_behance.svg';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';

interface defaultProps {
  [key: string]: any;
}

const ProfilePicBox = tw.div<defaultProps>`
border-[1px] w-[100px] h-[100px] rounded-full text-center border-[#999999] mt-[40px] cursor-pointer
`;

const UserSNSBox = tw.div<defaultProps>`
flex cursor-pointer
`;

export default function Join02() {
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
      <section className="mt-[22px]">
        <div className="font-bold">김영서</div>
        <div className="text-[#999999]">noniuxui@naver.com</div>
      </section>
      <section className="mt-[28px] flex">
        <UserSNSBox>
          <Image src={instagram} alt="instagram" />
          <span className="text-[#999999] ml-1">Add Instagram</span>
        </UserSNSBox>
        <UserSNSBox className="ml-3">
          <Image src={behance} alt="behance" />
          <span className="text-[#999999] ml-1">Add Behance</span>
        </UserSNSBox>
      </section>
      <section className="mt-[50px] mb-8">
        <Input
          className="mb-2"
          type="text"
          label="학력"
          placeholder="학력을 입력해주세요."
        />
        <Input
          className="mb-2"
          type="text"
          label="이력"
          placeholder="이력을 입력해주세요."
        />
        <Input
          type="text"
          label="작가소개"
          placeholder="한 줄 소개를 입력해주세요."
        />
      </section>
      <Button text="완료"></Button>
    </Layout>
  );
}
