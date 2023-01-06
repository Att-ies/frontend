import Image from 'next/image';
import avatar from '@public/svg/icons/profile/icon_avatar.svg';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

interface DefaultProps {
  [key: string]: any;
}
interface PickArtistProps {
  id: string;
  name: string;
  information: string;
}

const PickArtistContainer = tw.div<DefaultProps>`
w-full text-14 h-[98px] flex items-center cursor-pointer
`;

const PickAritstProfile = tw.div<DefaultProps>`
w-[50px] mr-[10px] aspect-square flex justify-center items-center rounded-full border-[1px] border-[#999999]
`;

export default function PickArtist({ id, name, information }: PickArtistProps) {
  const router = useRouter();
  return (
    <PickArtistContainer onClick={() => router.push(`/profile/pick/${id}`)}>
      <PickAritstProfile>
        <Image src={avatar} alt="avatar" width={28} height={28} />
      </PickAritstProfile>
      <span>{name}</span>
      <span className="pl-1">{information}</span>
    </PickArtistContainer>
  );
}
