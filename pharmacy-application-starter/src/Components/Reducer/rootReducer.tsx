import { combineReducers } from "redux";
import PatientReducer from "../Header/PatientHeader.reducer";
import cacheReducer from "../Cache/Cache.reducer";
import { OrderReducer } from "../Pages/Order/OrderRedux/Order.Reducer";

const rootReducer = combineReducers({
  patientReducer: PatientReducer,
  cacheReducer: cacheReducer,
  orderReducer: OrderReducer
});

export default rootReducer;
