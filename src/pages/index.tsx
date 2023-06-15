import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { Router, useRouter } from 'next/router';

export default function Home() {
  const refreshToken = getCookie('refreshToken');
  const isVisited = getCookie('isVisted');

  const location = !!refreshToken
    ? '/home'
    : isVisited
    ? '/auth/login'
    : '/begin';

  const router = useRouter();
  router.push(location);

  return <></>;
}
