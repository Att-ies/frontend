interface ChatProps {
  time: number | string;
  text: string;
  sender: string;
  [key: string]: any;
}

export default function ChatMessage({
  time,
  text,
  sender,
  ...rest
}: ChatProps) {
  return (
    <div {...rest}>
      {sender === 'me' ? (
        <div className=" flex justify-end items-center mt-1">
          <p className="text-10 text-[#767676] px-2">{time}</p>
          <p className="px-6 py-2 bg-[#F5535D] text-[#FFFFFF] text-12 rounded-l-xl rounded-br-2xl max-w-[230px]">
            {text}
          </p>
        </div>
      ) : (
        <div className="0  flex justify-start items-center mt-1">
          <p className="px-6 py-2 bg-[#EDEDED] text-[#767676] text-12 rounded-r-xl rounded-bl-2xl max-w-[230px]">
            {text}
          </p>
          <span className="text-10 text-[#767676] px-2">{time}</span>
        </div>
      )}
    </div>
  );
}
