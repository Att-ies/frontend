import tw from 'tailwind-styled-components';

interface ErrorMessageProps {
  message: any;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="text-14 text-[#FF3120]">{message}</span>;
}
