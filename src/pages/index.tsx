import Layout from '@components/common/Layout';
import authApi, { AuthApi } from '@apis/auth/authApi';

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
  const data = await authApi.postUserAuth(userInfo);
  console.log(data);
};

export default function Home() {
  const handleSubmit = () => {
    apiTest(userInfo);
  };
  return (
    <Layout>
      <button onClick={handleSubmit}>Test</button>
    </Layout>
  );
}
