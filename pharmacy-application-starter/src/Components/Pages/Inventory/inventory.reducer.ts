import { useState } from "react";
import {
  INVENTORY_ADD,
  INVENTORY_CLEAR,
  INVENTORY_DELETE,
  INVENTORY_GET,
  INVENTORY_SET,
  SET_INVENTORY_BY_FIELD_NAME,
  SET_INVENTORY_BY_HSC_CODE,
} from "./Inventory.actions";
import { inventoryChildInitialState } from "./Inventory.initialState";
import { InventoryItems } from "./Inventory.type";
import { DrugInfo } from "../Setups/Drug/DrugInfo.type";

export type InventoryReducerAction = {
  type: String;
  deleteIndex: Number;
  payload: InventoryItems[];
  index: number;
  fieldName: string;
  fieldValue: any;
  drugInfo: DrugInfo;
};

export const InventoryReducer = async (
  state: InventoryItems[],
  action: InventoryReducerAction
) => {
  switch (action.type) {
    case INVENTORY_ADD:
      return {...state, inventoryChildInitialState};

    case INVENTORY_DELETE:
      return await [
        ...state,
        (prevState: InventoryItems[]) => {
          const previousState = [...prevState];
          const state = previousState.map((item, i) => i != action.deleteIndex);
          return state;
        },
      ];

    case INVENTORY_SET:
      state = action.payload;
      return state;

    case SET_INVENTORY_BY_FIELD_NAME:
      return await [
        ...state,
        (prevState: InventoryItems[]) => {
          const oldState = [...prevState];
          oldState[action.index] = {
            ...oldState[action.index],
            [action.fieldName]: action.fieldValue,
          };
          return oldState;
        },
      ];

    case SET_INVENTORY_BY_HSC_CODE:
      return await [
        ...state,
        (prevState: InventoryItems[]) => {
          const oldState = [...prevState];
          oldState[action.index] = {
            ...oldState[action.index],
            drugName: String(action.drugInfo.name),
            drugCode: String(action.drugInfo.id),
            cgst: Number(action.drugInfo.cgst),
            sgst: Number(action.drugInfo.sgst),
            hsnCode: String(action.drugInfo.hsnCode),
          };
          return oldState;
        },
      ];

    case INVENTORY_GET:
      return state;

    case INVENTORY_CLEAR:
      return [];

    default:
      return [];
  }
};
