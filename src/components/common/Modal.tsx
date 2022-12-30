import tw from 'tailwind-styled-components';

interface ModalProps {
  message: string;
  isModal: boolean;
  isMain: boolean;
  denyMessage: string;
  onCloseModal: () => void;
  onAccept: () => void;
}

const ModalBackground = tw.div`
  absolute inset-0 bg-[#767676] opacity-80 backdrop-blur-3xl
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

const MainModalBackground = tw.div`
  absolute inset-0 bg-[#767676] opacity-60 backdrop-blur-3xl
`;
const MainModalInner = tw.div`
absolute z-10 w-[327px] h-[156px] bg-[#fff] inset-0 m-auto rounded-[4px]
`;
const MainModalMessage = tw.div`
h-[104px] text-[#191919] text-14 rounded-t-[4px] flex items-center justify-center font-bold p-5 text-14
`;

const MainModalDeny = tw.div`
w-[126px] h-[34px] border border-[#DBDBDB] rounded-[4px] flex items-center justify-center 
`;
const MainModalAccept = tw.div`
w-[126px] h-[34px]  bg-[#F5535D] rounded-[4px] text-[#FFF] flex items-center justify-center 
`;

export default function Modal({
  message,
  isModal = false,
  isMain = false,
  onCloseModal,
  denyMessage,
  onAccept,
}: ModalProps) {
  return (
    isModal &&
    (isMain ? (
      <ModalTag>
        <MainModalBackground onClick={onCloseModal}></MainModalBackground>
        <MainModalInner>
          <MainModalMessage>{message}</MainModalMessage>
          <div className="flex w-full justify-evenly ">
            <MainModalDeny onClick={onCloseModal}>취소</MainModalDeny>
            <MainModalAccept onClick={onAccept}>{denyMessage}</MainModalAccept>
          </div>
        </MainModalInner>
      </ModalTag>
    ) : (
      <ModalTag>
        <ModalBackground onClick={onCloseModal}></ModalBackground>
        <ModalInner>
          <ModalMessage>{message}</ModalMessage>
          <ModalAccept onClick={onCloseModal}>확인</ModalAccept>
        </ModalInner>
      </ModalTag>
    ))
  );
}
