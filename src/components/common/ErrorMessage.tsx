import tw from 'tailwind-styled-components';

interface ErrorMessageProps {
  message: any;
}

interface defaultProps {
  [key: string]: any;
}

const ErrorTag = tw.span<defaultProps>`
text-[#FF3120] text-14
`;

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <ErrorTag>{message}</ErrorTag>;
}
