import tw from 'tailwind-styled-components';
import Image from 'next/image';
interface NavigateProps {
  left_message?: string;
  message: string;
  right_message?: string;
  handleLeftButton: () => {};
  handleRightButton: () => {};
}

const NavigateBox = tw.header`
flex justify-between px-2 items-center font-semibold relative h-[64px] 
`;
const LeftButton = tw.div`
cursor-pointer z-10
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
          <SideMessage>{left_message}</SideMessage>
        ) : (
          <Image src="/svg/icons/icon_back.svg" width={10} />
        )}
      </LeftButton>

      <CenterMessage>{message}</CenterMessage>
      <RightButton onClick={handleRightButton}>
        {right_message ? (
          <SideMessage>{right_message}</SideMessage>
        ) : (
          <Image src="/svg/icons/icon_close.svg" width={20} />
        )}
      </RightButton>
    </NavigateBox>
  );
}
