import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';

interface NavigateProps {
  left_message?: React.ReactNode;
  message?: string;
  right_message?: React.ReactNode;
  isRightButton?: boolean;
  isLeftButton?: boolean;
  focused?: boolean;
  handleLeftButton?: () => void;
  handleRightButton?: () => void;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

interface LeftButtonProps extends DefaultProps {
  onClick?: () => void;
}

interface RightButtonProps extends DefaultProps {
  onClick?: () => void;
}

const NavigateBox = tw.header<DefaultProps>`
flex items-center relative h-[5rem] pt-[1.25rem]
`;

const LeftButton = tw.div<LeftButtonProps>`cursor-pointer z-10 absolute left-0
`;

const CenterMessage = tw.div`
font-medium text-18 absolute left-0 right-0 m-auto text-center 
`;

const RightButton = tw.div<RightButtonProps>`
text-14 z-10 cursor-pointer absolute right-0
`;
const SideMessage = tw.button`
  cursor-pointer z-10  text-14
`;

export default React.memo(function Navigate({
  left_message,
  message,
  right_message,
  isRightButton = true,
  isLeftButton = true,
  focused = true,
  handleLeftButton = () => {
    Router.back();
  },
  handleRightButton,
  ...rest
}: NavigateProps) {
  return (
    <NavigateBox {...rest}>
      {isLeftButton && (
        <LeftButton onClick={handleLeftButton}>
          {left_message ? (
            <SideMessage>{left_message}</SideMessage>
          ) : (
            <Image
              src="/svg/icons/back.svg"
              width={10}
              height={10}
              alt="back"
            />
          )}
        </LeftButton>
      )}

      <CenterMessage>{message}</CenterMessage>
      {isRightButton && (
        <RightButton onClick={handleRightButton}>
          {right_message ? (
            <SideMessage
              className={`text-${focused ? '[#191919]' : '[#999999]'}`}
            >
              {right_message}
            </SideMessage>
          ) : (
            <Image
              src="/svg/icons/close.svg"
              width={20}
              height={20}
              alt="close"
            />
          )}
        </RightButton>
      )}
    </NavigateBox>
  );
});
