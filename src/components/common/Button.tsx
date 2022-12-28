import tw from 'tailwind-styled-components';

interface buttonProps {
  text: string;
  disabled?: boolean;
  [key: string]: any;
}

const ButtonTag = tw.button`
w-full transition hover:cursor-pointer h-[52px] text-sm rounded-[4px] border border-transparent hover:[#F5535D]-2 bg-[#F5535D] px-0 text-white leading-3 font-normal absolute bottom-[83px] w-[325px]
`;

export default function Button({
  text,
  disabled = false,
  ...rest
}: buttonProps) {
  return disabled ? (
    <ButtonTag
      {...rest}
      disabled
      className="hover:cursor-not-allowed opacity-50"
    >
      {text}
    </ButtonTag>
  ) : (
    <ButtonTag {...rest}>{text}</ButtonTag>
  );
}
