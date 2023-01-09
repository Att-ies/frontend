import Image from 'next/image';
import tw from 'tailwind-styled-components';
import kakao from '@public/svg/social/kakao_logo.svg';
import naver from '@public/svg/social/naver_logo.svg';
import Link from 'next/link';
import { CONFIG } from '@config';
export interface SocialLoginButtonProps {
  kind: 'kakao' | 'naver';
  [key: string]: any;
}

const randomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const STATESTRING = randomString(20);

const KaKaoButton = tw.div<SocialLoginButtonProps>`
w-full h-[52px] flex items-center justify-center text-sm rounded-[4px] hover:opacity-90 border border-transparent hover:[#F5535D]-2 bg-[#F9E000] px-0 text-white leading-3 font-normal
`;

const NaverButton = tw.div<SocialLoginButtonProps>`
w-full h-[52px] flex items-center justify-center text-sm rounded-[4px] hover:opacity-90 border border-transparent text-[#38B1E1E] hover:[#F5535D]-2 bg-[#02C75A] px-0 text-white leading-3 font-normal
`;

export default function SocialLoginButton({
  kind,
  ...rest
}: SocialLoginButtonProps) {
  return kind === 'kakao' ? (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${CONFIG.API_KEYS.KAKAO}&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`}
    >
      <KaKaoButton {...rest}>
        <Image src={kakao} width={20} height={20} alt="kakao" />
        <span className="text-[#3B1E1E] ml-2">카카오톡으로 로그인</span>
      </KaKaoButton>
    </Link>
  ) : (
    <Link
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CONFIG.API_KEYS.NAVER}&state=${STATESTRING}&redirect_uri=http://localhost:3000/auth/naver/callback`}
    >
      <NaverButton {...rest}>
        <Image src={naver} width={20} height={20} alt="kakao" />
        <span className="text-white ml-2">네이버로 로그인</span>
      </NaverButton>
    </Link>
  );
}
