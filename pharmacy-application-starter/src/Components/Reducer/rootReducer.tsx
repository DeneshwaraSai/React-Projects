import { createRenderer } from "react-dom/test-utils";
import { combineReducers } from "redux";
import PatientReducer from "../Header/PatientHeader.reducer";

const rootReducer = combineReducers({
  patientReducer: PatientReducer,
});

export default rootReducer;
