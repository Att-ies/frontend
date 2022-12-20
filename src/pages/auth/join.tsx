import Layout from '@components/common/layout';
import { useForm } from 'react-hook-form';

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <Layout>
      <div className="border-gray-900 mx-auto w-full ">
        <div className="text-center text-2xl font-light mt-12">환영합니다</div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-8">
            <label htmlFor="username">사용자 이름</label>
            <input
              id="username"
              className="border-gray-900 border-2"
              placeholder="이름을 입력해주세요"
              type="text"
              {...register('name', { required: true })}
            />
            {errors.id && <span>이름을 입력해주세요</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">주소</label>
            <input
              id="address"
              className="border-gray-900 border-2"
              type="text"
              {...register('address', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              className="border-gray-900 border-2"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              className="border-gray-900 border-2"
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">휴대전화 번호 인증</label>
            <input
              id="phone"
              className="border-gray-900 border-2"
              type="text"
              {...register('phone', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="flex items-center">
            <input
              id="confirm"
              {...register('confirm', { required: true })}
              type="checkbox"
            />
            <div className="text-sm ml-2">
              <span className="underline underline-offset-2">
                이용약관, 개인정보
              </span>
              수집 및 이용 동의 (필수)
            </div>
          </div>
          <button className="w-full text-center text-sm font-light rounded-lg border-[1px] border-gray-900 text-black py-2 hover:bg-gray-100">
            회원가입
          </button>
          <button className="w-full text-center text-sm font-light rounded-lg bg-yellow-400 text-black py-2 hover:opacity-80">
            카카오로 3초만에 시작하기
          </button>
          <p className="text-center text-sm underline-offset-2 underline">
            작가로 가입하시나요?
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Join;
