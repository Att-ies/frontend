import Layout from '@components/common/Layout';
import authApi, { AuthApi } from '@apis/auth/authApi';
import axios from 'axios';
import { useMutation } from 'react-query';
import { loginMutation } from '@hooks/queries/useAuthApi';

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
  // console.log(loginMutation);
  const loginMutation = useMutation(
    () => {
      // axios({
      //   method: 'POST',
      //   url: `http://44.193.163.114:8080/members/join`,
      //   data: userInfo,
      // });
      AuthApi.postAuthForQuery(userInfo);
    },
    {
      onMutate: (variable) => {
        // console.log('onMutate', variable);
        // variable : {loginId: 'xxx', password; 'xxx'}
      },
      onError: (error, variable, context) => {
        console.log(error, variable, context);
        // error
      },
      onSuccess: (data, variables, context) => {
        console.log('success', data, variables, context);
      },
      onSettled: () => {
        console.log('end');
      },
    },
  );

  const handleSubmit = () => {
    loginMutation.mutate(userInfo);
  };
  return (
    <Layout>
      <button onClick={handleSubmit}>Test</button>
    </Layout>
  );
}
