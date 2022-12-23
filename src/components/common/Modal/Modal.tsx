import tw from 'tailwind-styled-components';
import * as React from 'react';

interface InputProps {
  isModal: boolean;
  children: React.ReactNode;
}

const ModalTag = tw.div`
w-full h-[500px] bg-[#AEAEAE] relative
`;

const ModalInner = tw.div`
    bg-white absolute left-0 right-0 button-0 top-0 m-auto
`;

export default function LoginInput({ isModal, children }: InputProps) {
  return (
    <ModalTag>
      <ModalInner>{children}</ModalInner>
    </ModalTag>
  );
}
