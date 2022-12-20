import tw from 'tailwind-styled-components';

interface buttonProps {
  text: string;
  disabled?: boolean;
  [key: string]: any;
}
const DisabledBtn = tw.button`
w-full transition cursor-not-allowed opacity-50 h-[52px] text-sm rounded-[32px] border border-transparent hover:[#F5535D]-2 bg-[#F5535D] px-0 text-white leading-3 font-normal
`;

const Btn = tw.button`
w-full transition hover:cursor-pointer h-[52px] text-sm rounded-[32px] border border-transparent hover:[#F5535D]-2 bg-[#F5535D] px-0 text-white leading-3 font-normal
`;

export default function Button({
  text,
  disabled = false,
  ...rest
}: buttonProps) {
  return disabled ? (
    <DisabledBtn {...rest} disabled>
      {text}
    </DisabledBtn>
  ) : (
    <Btn {...rest}>{text}</Btn>
  );
}
