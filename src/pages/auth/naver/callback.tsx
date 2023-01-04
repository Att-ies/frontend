import Layout from '@components/common/Layout';
import { useEffect } from 'react';
import instance from '@apis/_axios/instance';
import { setToken } from '@utils/localStorage/token';
import { Token } from '@utils/localStorage/token';
import { useRouter } from 'next/router';

export default function NaverCallback() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');
    instance
      .get(`/oauth2/naver?code=${code}&state=${state}`)
      .then((res) => {
        const token: Token = {
          access: res.data.accessToken,
          refresh: res.data.refreshToken,
        };
        if (token) setToken(token);
      })
      .then(() => router.push('/home'))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="grid gap-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-[#F5535D] rounded-full animate-bounce1"></div>
            <div className="w-3 h-3 bg-[#F5535D] rounded-full animate-bounce2"></div>
            <div className="w-3 h-3 bg-[#F5535D] rounded-full animate-bounce3"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}