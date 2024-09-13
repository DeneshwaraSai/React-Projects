import axios from "axios";
import { ApplicationCache, CacheAction } from "./Cache.types";
import { EndPoints, PHARMACY_HOST_NAME } from "../common/endPoints";

const initialState: ApplicationCache = {
  taxCategory: [],
  codeValue: null,
};

const cacheReducer = async (state = initialState, action: CacheAction) => {
  // console.log("Cache Started");

  const categoriesList = await getCacheByURL(
    PHARMACY_HOST_NAME + EndPoints.GET_TAX_CATEGORY
  );
  // console.log(categoriesList);

  const codeValue = await getCacheByURL(
    PHARMACY_HOST_NAME + EndPoints.GET_CODE_VALUE
  );
  // console.log(codeValue);

  // console.log("Cache Ended");

  return await {
    ...state,
    taxCategory: categoriesList,
    codeValue: codeValue,
  };
};

export const getCacheByURL = async (path: string) => {
  try {
    const category = await axios
      .get(path)
      .then((res) => res.data)
      .catch((err) => err);
    return category;
  } catch (err) {
    throw err;
  }
};

export default cacheReducer;
