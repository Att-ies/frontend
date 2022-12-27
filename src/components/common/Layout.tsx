import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="font-Pretendard w-full px-6 pt-[45px] pb-20 border min-h-[812px] relative">
      {children}
    </div>
  );
}
