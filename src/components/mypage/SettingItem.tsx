import Image from 'next/image';
import arrow from '@public/svg/icons/icon_arrow.svg';

interface SettingBoxProps {
  text: string;
  handler(): void;
}

export default function SettingItem({ text, handler }: SettingBoxProps) {
  return (
    <div className="flex justify-between text-sm mb-8">
      <span>{text}</span>
      <button onClick={handler}>
        <Image src={arrow} alt="arrow" />
      </button>
    </div>
  );
}
