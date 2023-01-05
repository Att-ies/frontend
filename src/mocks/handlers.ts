import { rest } from 'msw';

interface postAuthForm {
  nickname: string;
  userId: string;
  email: string;
  password: string;
  telephone: string;
  keywords: string[];
}

const DUMP_EMAIL_LIST = ['testEmail', 'testEmail1', 'testEmail2'];
const DUMP_USERID_LIST = ['testUserId', 'testUserId1', 'testUserId2'];

export const handlers = [
  rest.post<postAuthForm>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/join`,
    async (req, res, ctx) => {
      const userInfo = req.body;
      console.log(userInfo);
      if (
        !userInfo.nickname ||
        !userInfo.password ||
        !userInfo.email ||
        !userInfo.userId ||
        !userInfo.telephone ||
        !userInfo.keywords
      ) {
        return res(
          ctx.status(400),
          ctx.json({ message: 'Something is missed' }),
        );
      }
      if (DUMP_EMAIL_LIST.includes(userInfo.email)) {
        return res(ctx.status(409), ctx.json('이메일이 중복됩니다.'));
      }
      if (DUMP_USERID_LIST.includes(userInfo.userId)) {
        return res(ctx.status(409), ctx.json('아이디가 중복됩니다.'));
      }
      return res(ctx.status(200), ctx.json(userInfo));
    },
  ),
];
