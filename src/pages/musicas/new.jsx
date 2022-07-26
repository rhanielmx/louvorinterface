import { useRouter } from 'next/router';
import { useAuth } from "../../contexts/AuthContext";
import dynamic from "next/dynamic";
import { parseCookies } from 'nookies'
import React from 'react';
// import { GetServerSideProps } from 'next';
import { getAPIClient } from '../../services/axios';
import Head from 'next/head';

const LyricsForm = dynamic(
  () => import('../../components/LyricsForm'),
  // { ssr: false }
)

export default function New(props) {
  const { user } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   if (!user)
  //     router.push({ pathname: '/login', query: { from: router.pathname } })
  // }, [user, router])

  return (
    <>
      <Head><title>Enviar Letra</title></Head>
      <LyricsForm></LyricsForm>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { 'louvor.token': token } = parseCookies(ctx);
  const apiClient = getAPIClient(ctx);
  await apiClient.get('/admin/user').then(res => { console.log(res) }).catch(err => { console.log('new.error', err) })

  if (!token) {
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
