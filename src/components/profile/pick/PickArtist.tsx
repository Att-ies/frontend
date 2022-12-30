import Image from 'next/image';
import avatar from '@public/svg/icons/profile/icon_avatar.svg';
import tw from 'tailwind-styled-components';

interface defaultProps {
  [key: string]: any;
}

const PickArtistContainer = tw.div<defaultProps>`
w-full text-14 h-[98px] flex items-center cursor-pointer
`;

const PickAritstProfile = tw.div<defaultProps>`
w-[50px] mr-[10px] aspect-square flex justify-center items-center rounded-full border-[1px] border-[#999999]
`;

export default function PickArtist() {
  return (
    <PickArtistContainer>
      <PickAritstProfile>
        <Image src={avatar} alt="avatar" width={28} height={28} />
      </PickAritstProfile>
      <span>온주</span>
      <span className="pl-1">서울예술대학교 디지털 전공</span>
    </PickArtistContainer>
  );
}
