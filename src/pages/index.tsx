import Layout from '@components/common/Layout';
import authApi from '@apis/auth/authApi';
import axios from 'axios';
import { useQuery } from 'react-query';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

const userInfo = {
  nickname: 'test',
  userId: '1234',
  email: 'test@naver.com',
  address: '서울시 강동구',
  password: 'bakdddd222',
  telephone: '01012341234',
  keywords: [],
};
const apiTest = async () => {
  const data = await authApi.postAuth(userInfo);
  console.log(data);
};

export default function Home() {
  // const { isLoading, isError, data, error } = useQuery('todos', userInfo, {
  //   refetchOnWindowFocus: false,
  //   retry: 0, // 실패시 재호출 몇번 할지
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (e) => {
  //     console.log(e.message);
  //   },
  // });

  return (
    <Layout>
      <button onClick={apiTest}>Test</button>
    </Layout>
  );
}
