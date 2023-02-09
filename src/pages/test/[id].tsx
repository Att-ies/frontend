import Layout from '@components/common/Layout';
import React from 'react';
import { useRouter } from 'next/router';

export default function Test() {
  const router = useRouter();
  const id = Number(router.query.id);
  console.log(router.query);

  return <Layout>{id}</Layout>;
}
