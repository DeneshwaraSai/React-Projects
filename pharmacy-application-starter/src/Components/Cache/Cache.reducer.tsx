import axios from "axios";
import { CODE_VALUE, TAX_CATEGORY } from "./Cache.actions";
import { ApplicationCache, CacheAction } from "./Cache.types";
import { EndPoints, PHARMACY_HOST_NAME } from "../common/endPoints";
import { Patient } from "../Pages/PatientRegistration/patient.type";

const initialState: ApplicationCache = {
  taxCategory: [],
  codeValue: null,
};

const cacheReducer = async (state = initialState, action: CacheAction) => {
  // switch (action.type) {
  //   case TAX_CATEGORY:
  //     console.log("GET_TAX_CATEGORY STARTED");
  //     const response = await getCacheByURL(
  //       PHARMACY_HOST_NAME + EndPoints.GET_TAX_CATEGORY
  //     );
  //     console.log(response);
  //     console.log("GET_TAX_CATEGORY ENDED");
  //     break;

  //   case CODE_VALUE:
  //     console.log("PATIENT_LIST STARTED");
  //     const response1 = await getCacheByURL(
  //       PHARMACY_HOST_NAME + EndPoints.PATIENT_LIST
  //     );
  //     console.log(response1);
  //     console.log("PATIENT_LIST ENDED");
  //     break;

  //     default: return state;
  // }
  console.log("Cache Started");
  
  const response = await getCacheByURL(
    PHARMACY_HOST_NAME + EndPoints.GET_TAX_CATEGORY
  );
  console.log(response);

  const response1 = await getCacheByURL(
    PHARMACY_HOST_NAME + EndPoints.PATIENT_LIST
  );
  console.log(response1);


  console.log("Cache Ended");

  return await {
    ...state,
    taxCategory: response,
    codeValue: response1,
  };
};

export const getCacheByURL = async (path: string) => {
  try {
    const category = await axios.get(path);
    return category.data;
  } catch (err) {
    throw err;
  }
};

export default cacheReducer;
