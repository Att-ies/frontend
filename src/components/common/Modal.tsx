import tw from 'tailwind-styled-components';

interface ModalProps {
  message: string;
  isModal: boolean;
  onCloseModal: () => {};
}

const ModalBackground = tw.div`
  absolute inset-0 bg-[#767676] opacity-80 
`;
const ModalInner = tw.div`
  z-10 w-[327px] h-[156px] absolute inset-0 m-auto
`;
const ModalMessage = tw.div`
h-[104px] bg-white text-[#191919] text-14 rounded-t-[4px] flex items-center justify-center font-bold 
`;
const ModalAccept = tw.div`
bg-[#F5535D] h-[52px] rounded-b-[4px] text-white flex items-center justify-center cursor-pointer
`;

const ModalTag = tw.div`

`;

export default function Input({
  message,
  isModal = false,
  onCloseModal,
}: ModalProps) {
  return (
    isModal && (
      <ModalTag>
        <ModalBackground onClick={onCloseModal}></ModalBackground>
        <ModalInner>
          <ModalMessage>{message}</ModalMessage>
          <ModalAccept onClick={onCloseModal}>확인</ModalAccept>
        </ModalInner>
      </ModalTag>
    )
  );
}
