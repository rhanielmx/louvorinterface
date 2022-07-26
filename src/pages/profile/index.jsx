import Router, { useRouter } from "next/router";
import { useState, useEffect, Suspense } from "react";
import { useAuth } from "../../contexts/AuthContext";
// import Profile from "../../components/Profile";
import Message from "../../components/Message";

import dynamic from "next/dynamic";
import { parseCookies } from "nookies";

const Profile = dynamic(() => import("../../components/Profile"), {
  // ssr: false,
  suspense: true,
});


export async function getServerSideProps(context) {
  const { 'louvor.token': token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    const confirmationMessage = 'Changes you made may not be saved.';
    const beforeUnloadHandler = (e) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    };
    const beforeRouteHandler = (url) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        // to inform NProgress or something ...
        Router.events.emit('routeChangeError');
        // tslint:disable-next-line: no-string-throw
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };
    if (!saved) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      Router.events.on('routeChangeStart', beforeRouteHandler);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [saved]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }

  // }, [isAuthenticated, router])

  // if (typeof window !== 'undefined'){
  //     window.onbeforeunload =  () => {
  //         alert('Você saiu do site!');
  //     }
  // }

  return (
    <div className="h-screen">
      <Suspense fallback={<Message content="Carregando..." />}>
        {isAuthenticated && <Profile save={setSaved} />}
      </Suspense>
    </div>
  )
}