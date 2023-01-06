interface ErrorMessageProps {
  message: string | undefined;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return (
    <span className={`text-14 text-[#FF3120] ${className}`}>{message}</span>
  );
}
