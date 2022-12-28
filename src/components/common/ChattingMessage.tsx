import tw from 'tailwind-styled-components';

interface chattingProps {
  time: number | string;
  text: string;
  sender: string;
  [key: string]: any;
}

export default function ChattingMessage({
  time,
  text,
  sender,
  ...rest
}: chattingProps) {
  return (
    <div {...rest}>
      {sender === 'me' ? (
        <div className="h-[60px]">
          <span className="text-12 text-[#767676] px-2">{time}</span>
          <span className="px-7 py-3 bg-[#F5535D] text-[#FFFFFF] text-[12px] rounded-l-2xl rounded-br-2xl ">
            {text}
          </span>
        </div>
      ) : (
        <div>
          <span className="px-7 py-3 bg-[#EDEDED] text-[#767676] text-[12px] rounded-r-2xl rounded-bl-2xl ">
            {text}
          </span>
          <span className="text-12 text-[#767676] px-2">{time}</span>
        </div>
      )}
    </div>
  );
}
