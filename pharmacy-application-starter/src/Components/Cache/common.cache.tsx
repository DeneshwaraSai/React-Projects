import React, { Component } from "react";
import store from "../Store/store";
import { CodeValue, TaxCategory } from "./Cache.types";

export class CommonCache {
  static cache = store.getState().cacheReducer;

  static getCodeValues = ()=> {
    return this.cache.then((res) => res.codeValue);
  };

  static getTaxCategory = ()  => {
    return this.cache.then((res) => res.taxCategory);
  };
}

export default CommonCache;
