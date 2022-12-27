import tw from 'tailwind-styled-components';
import Image from 'next/image';
import styled from 'styled-components';
interface NavigateProps {
  status: string;
}

const NAVIGATIONITEM = [
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
    name: 'chatting',
  },
  {
    id: 5,
    name: 'my',
  },
];
const NavigationBarBox = tw.footer`
  absolute bottom-5
`;
const NavigationList = tw.div`flex`;
const NavigationItem = tw.div`
  m-auto w-[70px]
`;

export default function NavigationBar({}: NavigateProps) {
  return (
    <NavigationBarBox>
      <NavigationList>
        {NAVIGATIONITEM.map((navigationItem) => (
          <NavigationItem>
            <Image
              src={`/svg/icons/navigationBar/icon_${navigationItem.name}.svg`}
              width={30}
              height={30}
              alt="close"
            />
          </NavigationItem>
        ))}
      </NavigationList>
    </NavigationBarBox>
  );
}

{
  /* <Image
src="/svg/icons/icon_close.svg"
width={20}
height={20}
alt="close"
/> */
}
