import tw from 'tailwind-styled-components';

interface buttonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const ButtonTag = tw.button<buttonProps>`
${({ disabled }) => disabled && 'opacity-50 cursor-not-allowed'}
w-full transition h-[52px] text-sm rounded-[4px] border border-transparent hover:[#F5535D]-2 bg-[#F5535D] px-0 text-white leading-3 font-normal
`;

export default function Button({
  text,
  disabled = false,
  onClick,
  ...rest
}: buttonProps) {
  return (
    <ButtonTag {...rest} disabled={disabled} onClick={onClick}>
      {text}
    </ButtonTag>
  );
}
