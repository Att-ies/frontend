import tw from 'tailwind-styled-components';
import icon_back from '../../assets/icons/icon_back.svg';
import icon_close from '../../assets/icons/icon_close.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
interface NavigateProps {
  message: string;
  type: string;
  right_message?: string;
  handleLeftButton: () => {};
  handleRightButton: () => {};
}

const NavigateBox = tw.header`
flex justify-between px-2 items-center font-semibold
`;
const LeftButton = tw.div`
cursor-pointer
`;

const CenterMessage = tw.div`
text-[#191919] text-xs 
`;

const Right_Message = tw.p`
    text-xs cursor-pointer
`;
const RightButton = tw.div`
text-[#999999]
`;

export default function Navigate({
  message,
  right_message,
  handleLeftButton,
  handleRightButton,
}: NavigateProps) {
  return (
    <NavigateBox>
      <LeftButton>
        <Image src={icon_back} width={6} onClick={handleLeftButton} />
      </LeftButton>
      <CenterMessage>{message}</CenterMessage>
      <RightButton onClick={handleRightButton}>
        {right_message ? (
          <Right_Message>{right_message}</Right_Message>
        ) : (
          <Image src={icon_close} width={12} />
        )}
      </RightButton>
    </NavigateBox>
  );
}
