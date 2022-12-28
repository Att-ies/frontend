import tw from 'tailwind-styled-components';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const TABLIST = [
  {
    id: 1,
    name: 'home',
  },
  {
    id: 2,
    name: 'auction',
  },
  {
    id: 3,
    name: 'exhibition',
  },
  {
    id: 4,
    name: 'chat',
  },
  {
    id: 5,
    name: 'profile',
  },
];
const TabBox = tw.footer`
  absolute bottom-[34px]
`;
const TabList = tw.div`flex w-[327px] `;
const TabItem = tw.div`
  m-auto cursor-pointer
`;

export default function Tab() {
  const router = useRouter();
  const handleTabItem = (e: {
    target: {
      src: string;
      name: string;
    };
  }) => {
    const thisName = e.target.src.split('icon_')[1].split('.')[0];
    router.push(`/${thisName}`);
  };
  console.log(router.pathname.split('/')[1]);
  return (
    <TabBox>
      <TabList>
        {TABLIST.map((tabItem: any) => (
          <TabItem
            key={tabItem.id}
            onClick={handleTabItem}
            name={tabItem.name}
            id={tabItem.id}
          >
            <Image
              src={
                router.pathname.split('/')[1] === tabItem.name
                  ? `/svg/icons/Tab/icon_${tabItem.name}_focus.svg`
                  : `/svg/icons/Tab/icon_${tabItem.name}.svg`
              }
              width={28}
              height={28}
              alt={tabItem.name}
            />
          </TabItem>
        ))}
      </TabList>
    </TabBox>
  );
}
