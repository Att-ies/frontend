import { getCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const refreshToken = getCookie('refreshToken', ctx);
  const isVisited = getCookie('isVisted', ctx);

  const location = !!refreshToken
    ? '/home'
    : isVisited
    ? '/auth/login'
    : '/begin';

  if (location === '/begin') setCookie('isVisted', 'true', ctx);
  ctx.res.setHeader('Location', location);
  ctx.res.statusCode = 302;
  ctx.res.end();

  return {
    props: {},
  };
};

export default function Home() {
  return <></>;
}
