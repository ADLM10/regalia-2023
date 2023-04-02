import { AppProps } from "next/app";
import "./../styles/styles.css";
import localFont from "next/font/local";
import Script from "next/script";
import Router from "next/router";
import { useEffect, useState } from "react";
import "@/styles/globals.css";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const myFont = localFont({ src: "../public/fonts/Gismo-Trial-Round.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <span className="flex flex-col justify-center items-center h-screen w-screen">
          <LoadingSpinner />
        </span>
      ) : (
        <div className={myFont.className}>
          <Script src="../path/to/flowbite/dist/flowbite.min.js" />
          <Component {...pageProps} />
        </div>
      )}
    </>
  );
}
