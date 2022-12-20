import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="w-full h-screen px-6 py-12 ">{children}</div>;
}
