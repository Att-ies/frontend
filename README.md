# Atties - Frontend

## 목차

1. [프로젝트 소개 🎨](#프로젝트-소개-🎨)
2. [프로젝트 성능 향상 보고서 📈](#프로젝트-성능-향상-보고서-📈)
3. [컨밴션 🌈](#컨밴션-🌈)
4. [프로젝트 기술스택 🛠](#프로젝트-기술스택-🛠)
5. [우리의 성장기](#우리의-성장기)
6. [폴더 구조 📁](#폴더-구조-📁)

## 프로젝트 소개 🎨

졸업전시회에 대한 치열한 준비에도 불구하고, 많은 미술 대학생들의 졸업작품이 일회성 행사에 그치고, 후에 방치되거나 폐기되는 상황에 대해 대단히 아쉬움을 느꼈습니다. 그러므로, 이러한 작품들이 계속해서 사랑받을 수 있는 방법을 제공하고자 '아띠즈'를 설립하였습니다.

아띠즈는 졸업작품을 거래할 수 있는 플랫폼으로, 컬렉터들이 저렴한 비용으로 미술 작품을 구입하고, 미술 대학생들은 경제적 수익을 얻을 수 있으며, 동시에 자신의 작품을 세상에 널리 알릴 수 있는 소중한 기회를 제공하는 것이 목표입니다. 이를 통해, 미술 작품들이 영구적으로 소중하게 다루어지고, 그 가치를 지속적으로 인정받을 수 있도록 하는 것이 우리의 목표입니다.

### Links

- [기존 팀 프로젝트](https://github.com/Att-ies)
- [기존 팀 프로젝트-프론트엔드](https://github.com/Att-ies/frontend)
- [서비스](https://atties.vercel.app/)
  - 테스트 계정 ID : test01
  - 테스트 계정 PW : abcd1234

## 프로젝트 성능 향상 보고서 📈

### 프로젝트 개요

이 프로젝트는 Atties 팀의 기존 프로젝트에 대한 성능 개선 작업을 통해 리팩토링을 진행한 개인 프로젝트입니다. 초기에는 페이지 로드 시간 (LCP - Largest Contentful Paint)이 17.8초에 이르고, lighthouse 성능 점수가 47점이었습니다. 이 프로젝트의 주요 목표는 이러한 성능 지표를 개선하는 것이었습니다.

### 성능 향상 결과

프로젝트를 진행하고 나서, LCP는 12.9초로 줄어들었고, lighthouse 성능 점수는 62점으로 상승하였습니다. 이는 리팩토링을 통해 얻은 결과로, 기존 프로젝트에 비해 상당한 성능 개선이 이루어진 것을 보여줍니다.

### 리팩토링 및 성능 향상 방법

리팩토링을 진행하는 중, React.memo를 사용하여 성능을 개선하는 방법을 도입했습니다. React.memo는 React 컴포넌트의 불필요한 재렌더링을 줄이는 방법으로, 컴포넌트가 이전에 렌더링한 결과를 메모이징하고, 이후 동일한 props로 렌더링되는 경우 재사용합니다.

이 방법을 사용함으로써, 복잡한 컴포넌트의 렌더링 횟수를 줄이고 페이지 로드 시간을 단축시키는 데 크게 기여하였습니다. 따라서, 이는 LCP의 감소와 lighthouse 성능 점수의 상승에 중요한 역할을 하였습니다.

- [리팩토링하며 작성한 글](https://peter-coding.tistory.com/339)

| 리팩토링 전                                                                                                                                                               | 리팩토링 후                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLfW5v%2Fbtsc1NuzmRq%2FjJQlmePxqSF3wOOkfTFZ9K%2Fimg.png' /> | <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FejYjVm%2Fbtsc99pYH1A%2FZdZZhDKAB6KuCBnIGQcA1K%2Fimg.png'/> |

### 결론

이 프로젝트를 통해 기존 코드의 성능을 개선하고, 더욱 효과적인 방식으로 리팩토링하는 방법을 연구하였습니다. 이를 통해 웹 페이지의 로드 시간을 줄이고, 사용자 경험을 개선하는 데 기여하였습니다. 앞으로도 성능 최적화와 코드 품질 개선에 지속적으로 노력할 것입니다.

---

이 README는 프로젝트의 전반적인 개요와 성과를 간략하게 요약한 것입니다. 자세한 정보나 세부사항은 프로젝트 코드와 함께 제공되는 문서를 참조하시기 바랍니다.

## 컨밴션 🌈

[📄 네이밍 컨벤션](https://www.notion.so/guesung/f6bf625c22514d8a8a9793d551935a10?pvs=4)

[📄 타입스크립트 컨밴션](https://www.notion.so/guesung/typescript-convention-e335832c4c0e420f85a9f7de6b5d0db1?pvs=4)

[📄 Git 컨밴션](https://www.notion.so/guesung/PR-59399896b4504c4ea5703b8c3ac2b874)

## 프로젝트 기술스택 🛠

![](https://i.imgur.com/KN4SEfW.png)

- **Language :** [Typescript](https://www.typescriptlang.org/)
- **Framework :** [Next.js](https://nextjs.org/)
- **Package Manager :** [yarn-berry](https://yarnpkg.com/)
- **State Management :** [React Query](https://react-query.tanstack.com/), [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling :** [TailwindCSS](https://tailwindcss.com/), [tailwind-styled-components](https://www.npmjs.com/package/tailwind-styled-components), [HeadlessUI](https://headlessui.com/), [Swiper](https://swiperjs.com/react)
- **Forms :** [React Hook Form](https://react-hook-form.com/)
- **Formatter :** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Library :** [axios](https://axios-http.com/), [sockJS](https://github.com/sockjs/sockjs-client), [momentJS](https://momentjs.com/)

## 우리의 성장기

[🗝️ 카카오, 네이버 소셜 로그인](https://www.notion.so/guesung/social-login-4d9321791dec42a6a98590cf18a0dbb5?pvs=4)

[🧿 axios instance로 api 요청 전후 및 error 핸들링](https://www.notion.so/guesung/Axios-instance-53e9a3c00f354b8c92b44728f9987b3c?pvs=4)

[💧 react-query 제대로 알고 사용하기 ](https://www.notion.so/guesung/react-query-e32b280a1b184cd7b5ba699286a20604?pvs=4)

[🐽 Intersection Observer API와 react-query 사용하여 무한스크롤 구현](https://www.notion.so/guesung/Intersection-Observer-API-react-query-7e95dd67a0aa4830be0685e74e8093f0)

[🎨 tailwind-styled-component](https://www.notion.so/guesung/tailwind-styled-components-e8b95344e93d4ca88979b702deb7027e)

[💬 채팅, stompjs, socketjs](https://www.notion.so/guesung/Stomp-Soket-js-51dfc4ba27f94026bec470da0170ea01?pvs=4)

[🧡 스토리북 in nextjs and tailwind](https://www.notion.so/guesung/story-book-with-nextjs-and-tailwind-280f912916084649ad8d73e4e7b75abf?pvs=4)

[👣 @types 폴더에서 전역 type 정의](https://www.notion.so/guesung/types-type-7aeefdf592894c0d9a6f99993ba2a75e?pvs=4)

## 폴더 구조 📁

### 전체 구조

    ├── .yarn
    ├── .storybook              #
    ├── public                  #
    ├── src                     #
        ├── @types              #
        ├── apis                #
        ├── components          #
            ├── common          #
            ├── auction         #
            ├── auth            #
            └── ...             #
        ├── features            #
        ├── hooks               #
        ├── pages               #
        ├── stories             #
        ├── styles              #
        ├── utils               #
    ├── README.md               #
    └── ...

### apis

Api 요청과 관련한 함수들 입니다.

    .
    ├── apis
    │   ├── _axios
    │       └── instance.ts      # api instance를 만들어서 사용합니다.
    │   ├── admin                # api class를 만들고 비동기 함수들을 작성합니다.
    │   ├── artwork
    │   ├── aution
    └── ...

### components

공통 컴포넌트와 페이지 단위로 필요한 컴포넌트로 분리하여 관리합니다.

    .
    ├── ...
    ├── components
    │ ├── common
    │   ├── Button
    │   ├── Layout
    │   ├── Input
    │   ├── Modal
    │   └── ...
    │ ├── auction
    │ ├── chat
    │ ├── exhibition
    │ └── ...
    └── ...

### hooks

useQuery, useMutation으로 mapping한 query, mutation hook들과 개별 hook들을 작성합니다.

      .
    ├── ...
    ├── hooks
    │ ├── mutations
    │ ├── queries
    │ ├── useCountDown.ts
    │ ├── useInterval.ts
    │ └── ...
    └── ...
