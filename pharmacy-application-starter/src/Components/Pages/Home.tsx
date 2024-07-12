import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const patientHeader = useSelector((state: any) => state.patientReducer);
  console.log(patientHeader);

  return (
    <div className="home">
      <h2> Home </h2>
    </div>
  );
}

export default Home;
