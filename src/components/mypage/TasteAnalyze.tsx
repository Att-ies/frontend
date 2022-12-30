interface TasteAnalyzeProps {
  text: string;
}

export default function TasteAnalyze() {
  return (
    <div className="mt-6 mb-8">
      <div className="h-5 flex rounded-r-2xl rounded-l-2xl truncate">
        <div className="h-full bg-[#F5535D] basis-2/4"></div>
        <div className="h-full bg-[#F9989E] basis-1/4"></div>
        <div className="h-full bg-[#FDDDDE] basis-1/4"></div>
      </div>
      <ul className="flex mt-3 mb-8">
        <li className="ml-3 flex items-center">
          <div className="w-[6px] h-[6px] bg-[#F5535D] rounded-full"></div>
          <span className="ml-[7px] text-xs">사진</span>
        </li>
        <li className="ml-3 flex items-center">
          <div className="w-[6px] h-[6px] bg-[#F9989E] rounded-full"></div>
          <span className="ml-[7px] text-xs">풍경화</span>
        </li>
        <li className="ml-3 flex items-center">
          <div className="w-[6px] h-[6px] bg-[#FDDDDE] rounded-full"></div>
          <span className="ml-[7px] text-xs">유화</span>
        </li>
      </ul>
      <div className="relative w-[200px] h-[80px] m-auto">
        <span className="absolute font-bold top-7 left-7 text-lg text-[#F5535D]">
          몽환적인
        </span>
        <span className="absolute font-bold left-[12px] text-xs text-[#F9989E]">
          고요한
        </span>
        <span className="absolute font-bold right-[1px] text-[#F5535D]">
          미래적인
        </span>
        <span className="absolute font-bold bottom-0 left-11 text-xs text-[#F9989E]">
          모던한
        </span>
        <span className="absolute font-bold bottom-3 right-[1px] text-[#F9989E]">
          평온한
        </span>
        <span className="absolute font-bold left-[60px] text-[#F9989E]">
          빛나는
        </span>
      </div>
    </div>
  );
}
