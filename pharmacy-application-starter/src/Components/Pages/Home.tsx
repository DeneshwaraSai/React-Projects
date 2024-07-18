import store from "../Store/store";
import { PatientHeaderContext } from "../Header/PatientHeader.types";
import PatientHeader from "../Header/PatientHeader";
import CommonCache from "../Cache/common.cache";

function Home(props: any) {
  console.log(props);

  let patientHeader: PatientHeaderContext = store.getState().patientReducer;
  console.log(patientHeader);

  console.log(
    store.getState().cacheReducer.then((res) => {
      console.log(res);
    })
  );

  console.log("Started");
  console.log(CommonCache.getCodeValues().then((res)=>res));
  console.log("Ended");

  const patientHeaderNode = patientHeader ? (
    patientHeader.patientId === null ? (
      <div> </div>
    ) : (
      <PatientHeader patientHeader={patientHeader} />
    )
  ) : (
    <div></div>
  );

  return (
    <div className="home">
      {patientHeaderNode}
      <h2> Home </h2>
    </div>
  );
}

export default Home;
