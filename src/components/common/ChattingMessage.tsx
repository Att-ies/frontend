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
        // 내가 보낸 메세지
        <div className=" flex justify-end items-center mt-1">
          <p className="text-12 text-[#767676] px-2">{time}</p>
          <p className="px-7 py-2 bg-[#F5535D] text-[#FFFFFF] text-[12px] rounded-l-xl rounded-br-2xl max-w-[230px]">
            {text}
          </p>
        </div>
      ) : (
        // 상대방이 보낸 메세지
        <div className="0  flex justify-start items-center mt-1">
          <p className="px-7 py-2 bg-[#EDEDED] text-[#767676] text-[12px] rounded-r-xl rounded-bl-2xl max-w-[230px]">
            {text}
          </p>
          <span className="text-12 text-[#767676] px-2">{time}</span>
        </div>
      )}
    </div>
  );
}
