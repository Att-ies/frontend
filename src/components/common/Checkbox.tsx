import React from 'react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import check from '@public/svg/icons/icon_checked.svg';
import uncheck from '@public/svg/icons/icon_unchecked.svg';
import checkRadio from '@public/svg/icons/icon_radio_checked.svg';
import unCheckRadio from '@public/svg/icons/icon_radio_unchecked.svg';
import tw from 'tailwind-styled-components';
interface defaultProps {
  [key: string]: any;
}

const Label = tw.label<defaultProps>`flex items-center`;
const CheckBoxSpan = tw.span<defaultProps>`flex items-center justify-center rounded-sm mr-2`;
const CheckBoxInnerSpan = tw.span`text-12`;
const CheckBoxInput = tw.input`hidden`;
interface CheckBoxProps {
  id?: string;
  kind?: 'checkbox' | 'radio';
  label?: string;
  isChecked: boolean;
  handler(e: React.ChangeEvent<HTMLInputElement>): void;
  [key: string]: any;
}

export default function CheckBox({
  id,
  label,
  kind = 'checkbox',
  isChecked,
  handler,
  ...rest
}: CheckBoxProps) {
  const [isCheck, setIsCheck] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return kind === 'checkbox' ? (
    <Label>
      <CheckBoxSpan>
        {isChecked ? (
          <Image src={check} alt="checked" width={20} height={20} />
        ) : (
          <Image src={uncheck} alt="unchecked" width={20} height={20} />
        )}
      </CheckBoxSpan>
      <CheckBoxInnerSpan>{label}</CheckBoxInnerSpan>
      <CheckBoxInput
        ref={inputRef}
        id={id}
        type={kind}
        checked={isChecked}
        onChange={handler}
        {...rest}
      />
    </Label>
  ) : (
    <Label>
      <CheckBoxSpan
        onClick={() => {
          if (!inputRef) return;
          setIsCheck(!inputRef.current?.checked);
        }}
      >
        {isCheck ? (
          <Image src={checkRadio} alt="checkd" width={20} height={20} />
        ) : (
          <Image src={unCheckRadio} alt="uncheckd" width={20} height={20} />
        )}
      </CheckBoxSpan>
      <CheckBoxInnerSpan>{label}</CheckBoxInnerSpan>
      <CheckBoxInput
        id="checkobx"
        ref={inputRef}
        type="checkbox"
        className="hidden"
        {...rest}
      />
    </Label>
  );
}
