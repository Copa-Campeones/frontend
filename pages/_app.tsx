import { useState, useEffect } from "react";
import './globals.css'

function MyApp({ Component, pageProps }) {

 return (
    <div>
      <Component {...pageProps} session={pageProps.session} />
    </div>
 );
}
export default MyApp;