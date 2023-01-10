import Image from 'next/image';
import arrow from '@public/svg/icons/icon_arrow_light_gray.svg';
import { useRouter } from 'next/router';
interface SettingBoxProps {
  text: string;
  path: string;
}

export default function SettingItem({ text, path }: SettingBoxProps) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(path);
  };
  return (
    <div
      className="flex justify-between text-sm py-[16px] cursor-pointer font-bold text-14 border-b-[1px] border-[#F4F4F4]"
      onClick={handleNavigate}
    >
      <span>{text}</span>
      <button>
        <Image src={arrow} alt="arrow" />
      </button>
    </div>
  );
}
