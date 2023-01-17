import tw from 'tailwind-styled-components';
import Image from 'next/image';

interface AuctionArtItemProps {
  [key: string]: any;
}

const AuctionArtItemTag = tw.section`
flex mt-5 border-b last:border-none border-[#EDEDED] pb-5
`;

export default function AuctionArtItem({ ...rest }: AuctionArtItemProps) {
  return (
    <AuctionArtItemTag {...rest}>
      <div className="rounded overflow-hidden">
        <Image
          alt="example"
          src="/svg/example/example_picture_col.svg"
          width="70"
          height="0"
        />
      </div>
      <div className="ml-3">
        <p className="text-12 text-[#767676] font-bold">제 1회 아띠즈 경매</p>
        <p className="font-bold text-16">콰야 녹아내리는 고드름</p>
        <p className="text-14"> 아라</p>
        <p>
          <span className="text-10 text-[#FFF] bg-[#767676] px-1 py-0.5 rounded">
            배송완료
          </span>
          <span className="text-14 text-[#F5535D] font-bold ml-1">
            450,000원
          </span>
        </p>
      </div>
    </AuctionArtItemTag>
  );
}
