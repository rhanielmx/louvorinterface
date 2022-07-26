import Head from "next/head"

export default function Message(props) {
  return (
    <>
      <Head>
        <title>{props.title ?? props.content}</title>
      </Head>
      <div className={`
        h-screen
        flex flex-grow justify-center items-center text-center
        bg-gradient-to-r from-green-300 to-green-700
        text-white text-4xl
        `}>
        <div className='text-4xl'>{props.content}</div>
      </div>
    </>
  )
}