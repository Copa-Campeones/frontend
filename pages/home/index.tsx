import Header from "@/components/Header/Header";
import HomeBody from "@/components/HomeBody/HomeBody";
import { useState } from "react";
import { useSelector } from "react-redux";


function Home() {
    const session = useState(false);

    

  return (
    <>
      <Header />
      <HomeBody />
    </>
  )
}

export default Home;