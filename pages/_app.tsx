import { useState, useEffect } from "react";
import './globals.css'
import { AppProps } from "next/app";
import Providers from "@/store/providers";

function MyApp({ Component, pageProps }: AppProps) {

 return (
    <div>
      <Providers>
        <Component {...pageProps} session={pageProps.session} />
      </Providers>
    </div>
 );
}
export default MyApp;