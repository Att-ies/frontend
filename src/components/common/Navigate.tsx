import tw from 'tailwind-styled-components';
import icon_back from '../../assets/icons/icon_back.svg';
import icon_close from '../../assets/icons/icon_close.svg';
import Image from 'next/image';

interface NavigateProps {
  message: string;
  type: string;
  right_message?: string;
}

const NavigateBox = tw.header`
flex justify-between px-2 items-center 
`;
const LeftButton = tw.div`

`;

const CenterMessage = tw.div`
text-[#191919] text-xs 
`;

const Right_Message = tw.p`
    
`;
const RightButton = tw.div`
text-[#999999]
`;

export default function Navigate({ message, right_message }: NavigateProps) {
  return (
    <NavigateBox>
      <LeftButton>
        <Image src={icon_back} width={6} />
      </LeftButton>
      <CenterMessage>{message}</CenterMessage>
      <RightButton>
        {right_message ? (
          <Right_Message>{right_message}</Right_Message>
        ) : (
          <Image src={icon_close} width={12} />
        )}
      </RightButton>
    </NavigateBox>
  );
}
