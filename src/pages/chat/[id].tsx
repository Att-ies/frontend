import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';

interface ChatRoomProps {
  params: any;
}

export default function ChatRoom({ params }: ChatRoomProps) {
  console.log(params);

  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  return <Layout></Layout>;
}
