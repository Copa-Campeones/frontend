import Header from "@/components/Header/Header";
import { useState } from "react";
import { useSelector } from "react-redux";


function Home() {
    const session = useState(false);

    

  return (
    <>
      <Header />
    </>
  )
}

export default Home;