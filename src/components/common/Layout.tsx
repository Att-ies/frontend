import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="font-Pretendard w-full px-6 py-12 border relative">
      {children}
    </div>
  );
}
