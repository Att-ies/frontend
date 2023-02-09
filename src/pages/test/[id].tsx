import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';

export default function Test() {
  const router = useRouter();
  const id = Number(router.query.id);

  return <Layout>{id}</Layout>;
}
