interface PickArtistWorkProps {
  title: string;
  status: string;
  onClick: () => void;
}

export default function PickArtistWork({
  title,
  status,
  onClick,
}: PickArtistWorkProps) {
  return (
    <div className="flex items-center cursor-pointer" onClick={onClick}>
      <div className="bg-[#D9D9D9] w-[82px] aspect-square"></div>
      <div className="ml-5">
        <p className="text-14 mb-[6px] font-medium">{title} </p>
        <div
          className={`flex items-center justify-center w-[52px] text-white h-[17px] text-[10px]
          ${status === '입찰중' ? 'bg-[#4B9E77]' : 'bg-[#191919]'}`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
