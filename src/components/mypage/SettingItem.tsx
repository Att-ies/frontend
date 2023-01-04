import Image from 'next/image';
import arrow from '@public/svg/icons/icon_arrow.svg';
import { useRouter } from 'next/router';
interface SettingBoxProps {
  text: string;
  path: string;
}

export default function SettingItem({ text, path }: SettingBoxProps) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/profile/${path}`);
  };
  return (
    <div
      className="flex justify-between text-sm mb-6 cursor-pointer font-bold text-14"
      onClick={handleNavigate}
    >
      <span>{text}</span>
      <button>
        <Image src={arrow} alt="arrow" />
      </button>
    </div>
  );
}
