import { useState, useEffect } from "react";
// import "../styles/globals.css";
import { supabase } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
 const [session, setSession] = useState(null);

 useEffect(() => {
    console.log("MyApp");
  //  setSession(supabase.auth.session());
  //  supabase.auth.onAuthStateChange((_event, session) => {
  //   console.log( {session})
  //    setSession(session);
  //  });
 }, []);

 return (
   <div>
        <Component {...pageProps} session={session} />
   </div>
 );
}
export default MyApp;