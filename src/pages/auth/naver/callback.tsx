import instance from '@apis/_axios/instance';

import Loader from '@components/common/Loader';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NaverCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');
    instance
      .get(`/oauth2/naver?code=${code}&state=${state}`)
      .then((response) => {
        setCookie('refreshToken', response.data.refreshToken);
      })
      .then(() => router.push('/home'))
      .catch((err) => {
        err;
      });
  }, []);

  return (
    <article>
      <Loader />
    </article>
  );
}
