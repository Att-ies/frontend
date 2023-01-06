import Layout from '@components/common/Layout';
import authApi from '@apis/auth/authApi';
import axios from 'axios';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

const apiTest = async () => {
  const data = await authApi.postAuth({
    username: 'test',
    userId: '1234',
    email: 'test@naver.com',
    address: '서울시 강동구',
    password: 'bakdddd222',
    // telephone: '01012341234',
  });
  console.log(data);
};

// const mockingText = async () => {
//   const response = await axios({
//     method: 'post',
//     url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/join`,
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone',
//     },
//   });
//   console.log(response?.data);
// };

export default function Home() {
  return (
    <Layout>
      <button onClick={apiTest}>Test</button>
    </Layout>
  );
}
