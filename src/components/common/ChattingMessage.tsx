import tw from 'tailwind-styled-components';

interface chattingProps {
  [key: string]: any;
}

const ChattingMessageTag = tw.div``;

export default function ChattingMessage({ ...rest }: chattingProps) {
  <ChattingMessageTag {...rest}>sdds</ChattingMessageTag>;
}
