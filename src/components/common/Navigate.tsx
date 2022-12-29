import tw from 'tailwind-styled-components';
import Image from 'next/image';
import styled from 'styled-components';
interface NavigateProps {
  left_message?: string;
  message?: string;
  right_message?: string;
  handleLeftButton?: () => void;
  handleRightButton?: () => void;
}

interface defaultProps {
  children: string | JSX.Element | JSX.Element[];
}

interface LeftButtonProps extends defaultProps {
  $onClick?: () => void;
}

const NavigateBox = tw.header<defaultProps>`
flex justify-between items-center font-semibold relative h-[64px] 
`;

const LeftButton = tw.button<LeftButtonProps>`cursor-pointer z-10
`;

const CenterMessage = tw.div`
text-font-1 text-18 absolute left-0 right-0 m-auto text-center
`;

const RightButton = tw.div`
text-14 z-10 cursor-pointer 
`;
const SideMessage = tw.p`
    cursor-pointer z-10  text-14 
`;

export default function Navigate({
  left_message,
  message,
  right_message,
  handleLeftButton,
  handleRightButton,
}: NavigateProps) {
  return (
    <NavigateBox>
      <LeftButton onClick={handleLeftButton}>
        {left_message ? (
          left_message === 'X' ? (
            <Image
              alt=""
              src="/svg/icons/icon_close.svg"
              width="20"
              height="0"
            />
          ) : (
            <SideMessage>{left_message}</SideMessage>
          )
        ) : (
          <Image
            src="/svg/icons/icon_back.svg"
            width={10}
            height={10}
            alt="back"
          />
        )}
      </LeftButton>

      <CenterMessage>{message}</CenterMessage>
      <RightButton onClick={handleRightButton}>
        {right_message ? (
          <SideMessage className="text-[#999999] text-[16px]">
            {right_message}
          </SideMessage>
        ) : (
          <Image
            src="/svg/icons/icon_close.svg"
            width={20}
            height={20}
            alt="close"
          />
        )}
      </RightButton>
    </NavigateBox>
  );
}
