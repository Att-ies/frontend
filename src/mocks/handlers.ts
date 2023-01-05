import { rest } from 'msw';

export interface FriendResponse {
  data: {
    name: string;
    info: {
      brithday: string;
      mbti: string;
      blood: string;
      etc: string;
    };
  };
}

export const handlers = [
  // Handles a GET /user request
  rest.get<FriendResponse>('https://backend.dev/friends', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'x',
        info: {
          brithday: '0_월 __일',
          mbti: 'ISFP',
          blood: '_형',
          etc: '',
        },
      }),
    );
  }),
];
