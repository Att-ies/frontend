import authApi from '@apis/auth/authApi'
import arrow from '@public/svg/icons/icon_arrow_light_gray.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { deleteToken } from '@utils/localStorage/token'

interface SettingItemProps {
  key: string;
  text: string;
  path: string;
}

export default function SettingItem({ text, path }: SettingItemProps) {
  const router = useRouter();
  const handleNavigate = async () => {
    if (text === '๋ก๊ทธ์์') {
      await authApi.postLogout();
      deleteToken();
    }
    router.push(path);
  };
  return (
    <div
      className="flex justify-between text-sm py-[14px] cursor-pointer font-bold text-14 border-b-[1px] border-[#F4F4F4]"
      onClick={handleNavigate}
    >
      <span>{text}</span>
      <button>
        <Image src={arrow} alt="arrow" />
      </button>
    </div>
  );
}
