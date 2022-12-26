import { useForm } from 'react-hook-form';
import Layout from '@components/common/Layout';

function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <Layout>
      <div className="border-gray-900 mx-auto w-full ">
        <div className="text-left text-2xl font-light mt-12">비밀번호 찾기</div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="flex flex-col mt-36">
            가입한 이메일 주소를 입력하세요
          </h1>
          <div className="flex flex-col">
            <input
              id="id"
              className="border-gray-900 border-2"
              placeholder="example@naver.com"
              type="text"
              {...register('id', { required: true })}
            />
            {errors.id && <span>This field is required</span>}
          </div>
          <div className="flex flex-col">
            <span>
              가입하신 이메일 주소를 입력해주시면 새로운 비밀번호를 설정 가능한
              링크를 보내드립니다.
            </span>
          </div>

          <button className="w-full text-center text-sm font-light rounded-lg bg-gray-900 text-white py-2 hover:bg-gray-800">
            이메일 전송하기
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Password;
