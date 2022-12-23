import tw from 'tailwind-styled-components';
import icon_back from '../../assets/icons/icon_back.svg';
import icon_close from '../../assets/icons/icon_close.svg';
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
const Right_Message = tw.p`
    cursor-pointer z-10  text-14 text-[#999999]
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
          <Right_Message>{left_message}</Right_Message>
        ) : (
          <Image src={icon_back} width={10} />
        )}
      </LeftButton>

      <CenterMessage>{message}</CenterMessage>
      <RightButton onClick={handleRightButton}>
        {right_message ? (
          <Right_Message>{right_message}</Right_Message>
        ) : (
          <Image src={icon_close} width={20} />
        )}
      </RightButton>
    </NavigateBox>
  );
}
