# Atties - Frontend

## ν΄λ κ΅¬μ‘° π

### μ μ²΄ κ΅¬μ‘°

    βββ .yarn
    βββ .storybook              #
    βββ public                  #
    βββ src                     #
        βββ @types              #
        βββ apis                #
        βββ components          #
            βββ common          #
            βββ auction         #
            βββ auth            #
            βββ ...             #
        βββ features            #
        βββ hooks               #
        βββ pages               #
        βββ stories             #
        βββ styles              #
        βββ utils               #
    βββ README.md               #
    βββ ...

### apis

Api μμ²­κ³Ό κ΄λ ¨ν ν¨μλ€ μλλ€.

    .
    βββ apis
    β   βββ _axios
    β       βββ instance.ts      # api instanceλ₯Ό λ§λ€μ΄μ μ¬μ©ν©λλ€.
    β   βββ admin                # api classλ₯Ό λ§λ€κ³  λΉλκΈ° ν¨μλ€μ μμ±ν©λλ€.
    β   βββ artwork
    β   βββ aution
    βββ ...

### components

κ³΅ν΅ μ»΄ν¬λνΈμ νμ΄μ§ λ¨μλ‘ νμν μ»΄ν¬λνΈλ‘ λΆλ¦¬νμ¬ κ΄λ¦¬ν©λλ€.

    .
    βββ ...
    βββ components
    β βββ common
    β   βββ Button
    β   βββ Layout
    β   βββ Input
    β   βββ Modal
    β   βββ ...
    β βββ auction
    β βββ chat
    β βββ exhibition
    β βββ ...
    βββ ...

### hooks

useQuery, useMutationμΌλ‘ mappingν query, mutation hookλ€κ³Ό κ°λ³ hookλ€μ μμ±ν©λλ€.

      .
    βββ ...
    βββ hooks
    β βββ mutations
    β βββ queries
    β βββ useCountDown.ts
    β βββ useInterval.ts
    β βββ ...
    βββ ...

## μ»¨λ°΄μ π

[π λ€μ΄λ° μ»¨λ²€μ](https://www.notion.so/guesung/f6bf625c22514d8a8a9793d551935a10?pvs=4)

[π νμμ€ν¬λ¦½νΈ μ»¨λ°΄μ](https://www.notion.so/guesung/typescript-convention-e335832c4c0e420f85a9f7de6b5d0db1?pvs=4)

[π Git μ»¨λ°΄μ](https://www.notion.so/guesung/PR-59399896b4504c4ea5703b8c3ac2b874)

## νλ‘μ νΈ κΈ°μ μ€ν π 

![](https://i.imgur.com/KN4SEfW.png)

- **Language :** [Typescript](https://www.typescriptlang.org/)
- **Framework :** [Next.js](https://nextjs.org/)
- **Package Manager :** [yarn-berry](https://yarnpkg.com/)
- **State Management :** [React Query](https://react-query.tanstack.com/), [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling :** [TailwindCSS](https://tailwindcss.com/), [tailwind-styled-components](https://www.npmjs.com/package/tailwind-styled-components), [HeadlessUI](https://headlessui.com/), [Swiper](https://swiperjs.com/react)
- **Forms :** [React Hook Form](https://react-hook-form.com/)
- **Formatter :** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Library :** [axios](https://axios-http.com/), [sockJS](https://github.com/sockjs/sockjs-client), [momentJS](https://momentjs.com/)

## μ°λ¦¬μ μ±μ₯κΈ°...

[ποΈ μΉ΄μΉ΄μ€, λ€μ΄λ² μμ λ‘κ·ΈμΈ](https://www.notion.so/guesung/social-login-4d9321791dec42a6a98590cf18a0dbb5?pvs=4)

[π§Ώ axios instanceλ‘ api μμ²­ μ ν λ° error νΈλ€λ§](https://www.notion.so/guesung/Axios-instance-53e9a3c00f354b8c92b44728f9987b3c?pvs=4)

[π§ react-query μ λλ‘ μκ³  μ¬μ©νκΈ° ](https://www.notion.so/guesung/react-query-e32b280a1b184cd7b5ba699286a20604?pvs=4)

[π½ Intersection Observer APIμ react-query μ¬μ©νμ¬ λ¬΄νμ€ν¬λ‘€ κ΅¬ν](https://www.notion.so/guesung/Intersection-Observer-API-react-query-7e95dd67a0aa4830be0685e74e8093f0)

[π¨ tailwind-styled-component](https://www.notion.so/guesung/tailwind-styled-components-e8b95344e93d4ca88979b702deb7027e)

[π¬ μ±ν, stompjs, socketjs](https://www.notion.so/guesung/Stomp-Soket-js-51dfc4ba27f94026bec470da0170ea01?pvs=4)

[π§‘ μ€ν λ¦¬λΆ in nextjs and tailwind](https://www.notion.so/guesung/story-book-with-nextjs-and-tailwind-280f912916084649ad8d73e4e7b75abf?pvs=4)

[π£ @types ν΄λμμ μ μ­ type μ μ](https://www.notion.so/guesung/types-type-7aeefdf592894c0d9a6f99993ba2a75e?pvs=4)
