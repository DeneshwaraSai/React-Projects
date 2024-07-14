import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../Store/store";
import { PatientHeaderContext } from "../Header/PatientHeader.types";
import PatientHeader from "../Header/PatientHeader";

function Home(props: any) {
  console.log(props);
  console.log(store.getState().patientReducer);

  let patientHeader:PatientHeaderContext = store.getState().patientReducer;
  console.log(patientHeader);

  const patientHeaderNode = (patientHeader ?  (patientHeader.patientId === null ? <div> </div> :  <PatientHeader patientHeader={patientHeader} />) : <div></div>);

  return (
    <div className="home">
      {patientHeaderNode}
      <h2> Home </h2>
    </div>
  );
}

export default Home;
