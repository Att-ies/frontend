interface ErrorMessageProps {
  message: string;
  moreClassName?: string;
}

export default function ErrorMessage({
  message,
  moreClassName,
}: ErrorMessageProps) {
  return (
    <span className={`text-14 text-[#FF3120] ${moreClassName}`}>{message}</span>
  );
}
