import { useState, useEffect } from "react";
import './globals.css'
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {

 return (
    <div>
      <Component {...pageProps} session={pageProps.session} />
    </div>
 );
}
export default MyApp;