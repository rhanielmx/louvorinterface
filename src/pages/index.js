import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head><title>Repositório do Ministério de Louvor</title></Head>
      <div className={`
        h-screen bg-cover
        flex flex-grow justify-center items-center text-center
        `}>
        <h1 className="text-white text-5xl font-medium md:relative md:-top-24">Repositório de Músicas - Ministério de Louvor</h1>
      </div>
    </>
  )
}
