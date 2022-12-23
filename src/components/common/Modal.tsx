import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
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
h-[104px] bg-white rounded-t-[4px] flex items-center justify-center font-bold 
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

// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useState } from 'react';
// import tw from 'tailwind-styled-components';

// interface ModalProps {
//   message: string;
//   isModal: boolean;
//   onCloseModal: () => {};
// }

// const ModalMessage = tw.div`
// h-[104px] bg-white rounded-t-[4px] flex items-center justify-center font-bold
// `;
// const ModalAccept = tw.div`
// bg-[#F5535D] h-[52px] rounded-b-[4px] text-white flex items-center justify-center cursor-pointer
// `;

// export default function Input({
//   message,
//   isModal = false,
//   onCloseModal,
// }: ModalProps) {
//   let [isOpen, setIsOpen] = useState(true);
//   return (
//     <>
//       <Transition appear show={isModal} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-10 w-full h-full"
//           onClose={onCloseModal}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-50" />
//           </Transition.Child>
//           {/* <div className="fixed inset-0 overflow-y-auto bottom-0 top-0 right-0 left-0 m-auto"> */}
//           {/* <div className="inset-0 m-auto bg-black"> */}
//           {/* </div> */}
//           <div className="flex min-h-full items-center justify-center p-4 text-center absolute inset-0 w-100 h-10">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-[327px] max-w-md transform overflow-hidden rounded-[4px] align-middle transition-all  text-center">
//                 <ModalMessage>{message}</ModalMessage>

//                 <ModalAccept onClick={onCloseModal}>확인</ModalAccept>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }
