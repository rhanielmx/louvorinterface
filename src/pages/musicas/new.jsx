import dynamic from "next/dynamic";
import React from 'react';
import { getAPIClient } from '../../services/axios';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

const LyricsForm = dynamic(
  () => import('../../components/LyricsForm'),
  // { ssr: false }
)

export default function New(props) {
   return (
    <>
      <Head><title>Enviar Letra</title></Head>
      <LyricsForm></LyricsForm>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const apiClient = getAPIClient(ctx);
  await apiClient.get('/admin/user').then(res => { console.log(res) }).catch(err => { console.log('new.error', err) })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
