import Layout from '@components/common/layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <Layout>
      <div className="border-gray-900 mx-auto w-full ">
        <div className="text-center text-2xl font-light mt-12">로고</div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-36">
            <input
              id="id"
              className="border-gray-900 border-2"
              placeholder="아이디 입력"
              type="text"
              {...register('id', { required: true })}
            />
            {errors.id && <span>This field is required</span>}
          </div>
          <div className="flex flex-col">
            <input
              id="password"
              className="border-gray-900 border-2"
              placeholder="비밀번호 입력"
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <button className="w-full text-center text-sm font-light rounded-lg bg-gray-900 text-white py-2 hover:bg-gray-800">
            로그인
          </button>
          <button className="w-full text-center text-sm font-light rounded-lg bg-gray-900 text-white py-2 hover:bg-gray-800">
            회원가입
          </button>
          <p className="w-full text-center">
            <Link href="/auth/id">아이디 찾기</Link> |{' '}
            <Link href="/auth/password">비밀번호 찾기</Link>
          </p>
          <button className="w-full text-center text-sm font-light rounded-lg bg-yellow-400 text-black py-2 hover:opacity-80">
            카카오 로그인
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
