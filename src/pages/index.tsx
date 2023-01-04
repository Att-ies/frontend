import Layout from '@components/common/Layout';
import authApi from '@apis/auth/authApi';
export default function Home() {
  const apiTest = async () => {
    const data = await authApi.postAuth({
      username: 'test',
      userId: '1234',
      email: 'test@naver.com',
      address: '서울시 강동구',
      password: 'bakdddd222',
      telephone: '01012341234',
    });
    console.log(data);
  };

  return (
    <Layout>
      <button onClick={apiTest}>테스트</button>
    </Layout>
  );
}
