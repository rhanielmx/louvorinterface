import Login from "../components/Login";
import { parseCookies } from "nookies";
import { getAPIClient } from "../services/axios";
import Head from "next/head";

export default function LoginPage(props) {
  return (
    <>
      <Head><title>Entrar</title></Head>
      <Login></Login>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { 'louvor.token': token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const apiClient = getAPIClient(ctx);
  await apiClient.get('/admin/user').then(res => { console.log('login.success') }).catch(err => { console.log('login.error', err) })

  return {
    props: {}
  }
}