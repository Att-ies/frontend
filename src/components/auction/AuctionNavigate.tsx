import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface AuctionNavigateProps {
  [key: string]: any;
}

const AuctionNavigateTag = tw.div<AuctionNavigateProps>``;

export default function AuctionNavigate({ ...rest }: AuctionNavigateProps) {
  const router = useRouter();
  const handleSearch = () => {
    router.push('/search');
  };
  const handleNotice = () => {
    router.push('/notice');
  };
  const handleLeftButton = () => {
    router.push('/home');
  };
  return (
    <AuctionNavigateTag {...rest}>
      <Navigate
        left_message={
          <Image alt="" src="/svg/icons/icon_logo.svg" width="80" height="0" />
        }
        right_message={
          <div className="flex w-[50px] justify-between">
            <Image
              alt=""
              src="/svg/icons/icon_search.svg"
              width="22"
              height="0"
              onClick={handleSearch}
            />
            <Image
              alt=""
              src="/svg/icons/icon_notification.svg"
              width="22"
              height="0"
              onClick={handleNotice}
            />
          </div>
        }
        handleLeftButton={handleLeftButton}
      />
      <div className="relative">
        <div className="absolute left-0 text-12">작품 17,029</div>
        <div className="absolute right-0 text-12 flex cursor-pointer">
          인기순
          <Image
            alt=""
            src="/svg/icons/icon_arrow_sort.svg"
            width="18"
            height="0"
          />
        </div>
      </div>
    </AuctionNavigateTag>
  );
}
