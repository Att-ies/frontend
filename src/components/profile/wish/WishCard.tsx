import Image from 'next/image';
import favorite from '@public/svg/icons/icon_favorite.svg';
import tw from 'tailwind-styled-components';

interface defaultProps {
  [key: string]: any;
}

const WishCardContainer = tw.div<defaultProps>`
rounded-lg hover:ring-1 hover:ring-blue-500 cursor-pointer
`;

export default function WishCard() {
  return (
    <WishCardContainer>
      <div className="h-28 bg-gray-300 rounded-t-lg relative">
        <Image
          className="absolute top-3 right-3"
          src={favorite}
          alt="favoirte"
        />
      </div>
      <div className="h-28 p-3 rounded-b-lg border-x-[1px] border-[#ededed] border-b-[1px]">
        <div className="flex text-white w-[84px] text-[10px]">
          <div className="w-1/2 h-[17px] bg-[#4B9E77]  flex justify-center items-center">
            입찰중
          </div>
          <div className="w-1/2 h-[17px] bg-[#F5535D]  flex justify-center items-center">
            HOT
          </div>
        </div>
        <div className="pt-[6px]">
          <div className="text-14 leading-4">퓨처리즘</div>
          <div className="text-14 leading-6">자연과 공생하는 미래</div>
          <div className="text-14 leading-6 font-medium">250,000원</div>
        </div>
      </div>
    </WishCardContainer>
  );
}
