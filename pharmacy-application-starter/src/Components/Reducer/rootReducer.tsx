import { createRenderer } from "react-dom/test-utils";
import { combineReducers } from "redux";
import PatientReducer from "../Header/PatientHeader.reducer";
import cacheReducer from "../Cache/Cache.reducer";

const rootReducer = combineReducers({
  patientReducer: PatientReducer,
  cacheReducer: cacheReducer,
});

export default rootReducer;
