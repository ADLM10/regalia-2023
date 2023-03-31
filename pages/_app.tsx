import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { useState } from "react";
import './../styles/styles.css';
import localFont from '@next/font/local';
import Hero from "./../components/hero"
import "../styles/globals.css"
import Script from 'next/script'

const myFont = localFont({ src: "../public/fonts/Gismo-Trial-Round.woff2" });
export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className={myFont.className}>
      <Script src="../path/to/flowbite/dist/flowbite.min.js"/>
      <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  );
}
