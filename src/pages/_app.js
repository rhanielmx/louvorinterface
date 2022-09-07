import '../styles/main.css';
import { AuthProvider } from '../contexts/AuthContext';
import Script from "next/script";
import Navbar from '../components/Navbar/Navbar';
import { SessionProvider } from "next-auth/react"

// const Navbar = dynamic(
//   () => import('../components/Navbar'),
//   { ssr: false }
// )


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <>
    <div className='flex flex-col h-screen bg-igreja bg-center md:bg-cover bg-local bg-green-800 bg-blend-overlay overflow-y-auto'>
      <SessionProvider session={session}>
          <Navbar></Navbar>
          <Component {...pageProps} />
      </SessionProvider>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
    </div>
  </>
}

export default MyApp