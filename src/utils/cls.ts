export default function cls(...className: string[]) {
  return className.filter(Boolean).join(' ');
}
