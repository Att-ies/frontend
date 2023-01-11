import Image from 'next/image';

interface FileItemForm {
  img: string;
  handler: (img: string) => void;
}

export default function FileItem({ img, handler }: FileItemForm) {
  return (
    <div className="w-[60px] h-[60px] border-[1px] border-[#DBDBDB] rounded ml-3 relative">
      <div
        onClick={() => handler(img)}
        className="w-[14px] h-[14px] bg-[#999999] rounded-full flex justify-center items-center absolute right-[-5px] top-[-5px]"
      >
        <Image
          src="/svg/icons/icon_close_white.svg"
          alt="close"
          width={15}
          height={15}
        />
      </div>
      <Image
        src={img}
        alt={img}
        width={20}
        height={20}
        className="w-full h-full"
      />
    </div>
  );
}
