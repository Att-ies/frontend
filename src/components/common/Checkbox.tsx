import Image from 'next/image';
import { useRef, useState } from 'react';
import check from '@public/svg/icons/icon_checked.svg';
import uncheck from '@public/svg/icons/icon_unchecked.svg';
import checkRadio from '@public/svg/icons/icon_radio_checked.svg';
import unCheckRadio from '@public/svg/icons/icon_radio_unchecked.svg';

interface CheckBoxProps {
  kind?: 'checkbox' | 'radio';
  label?: string;
  [key: string]: any;
}

export default function CheckBox({
  label,
  kind = 'checkbox',
  ...rest
}: CheckBoxProps) {
  const [isCheck, setIsCheck] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return kind === 'checkbox' ? (
    <label className="w-full flex items-center">
      <span
        onClick={() => {
          if (!inputRef) return;
          setIsCheck(!inputRef.current?.checked);
        }}
        className="flex items-center justify-center rounded-sm mr-2"
      >
        {isCheck ? (
          <Image src={check} alt="checkd" width={20} height={20} />
        ) : (
          <Image src={uncheck} alt="uncheckd" width={20} height={20} />
        )}
      </span>
      <span className="text-14">{label}</span>
      <input
        id="checkobx"
        ref={inputRef}
        type="checkbox"
        className="hidden"
        {...rest}
      />
    </label>
  ) : (
    <label className="w-full flex items-center">
      <span
        onClick={() => {
          if (!inputRef) return;
          setIsCheck(!inputRef.current?.checked);
        }}
        className="flex items-center justify-center rounded-sm mr-2"
      >
        {isCheck ? (
          <Image src={checkRadio} alt="checkd" width={20} height={20} />
        ) : (
          <Image src={unCheckRadio} alt="uncheckd" width={20} height={20} />
        )}
      </span>
      <span className="text-14">{label}</span>
      <input
        id="checkobx"
        ref={inputRef}
        type="checkbox"
        className="hidden"
        {...rest}
      />
    </label>
  );
}
