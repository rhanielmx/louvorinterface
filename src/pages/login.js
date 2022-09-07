import Login from "../components/Login";
import { parseCookies } from "nookies";
import { getAPIClient } from "../services/axios";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function LoginPage(props) {  
  return (
    <>
      <Head><title>Entrar</title></Head>
      <Login></Login>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}