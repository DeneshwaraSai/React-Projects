import { initialOrderItems } from "../order.initialState";
import { OrderItems } from "../Order.type";
import {
  DELETE_ORDER_DETAILS_BY_ID,
  ORDER_DETAILS_ADD,
  ORDER_DETAILS_CLEAR,
  ORDER_DETAILS_GET,
  ORDER_DETAILS_SET,
  SET_ORDER_DERAILS_BY_FIELD_NAME,
} from "./Order.actions";

export type OrderReducerAction = {
  type: string;
  deleteIndex: number;
  fieldName: string;
  fieldValue: any;
  index: number;
  payload: OrderItems[];
};

export const OrderReducer = async (
  state: OrderItems[],
  action: OrderReducerAction
) => {
  switch (action.type) {
    case ORDER_DETAILS_ADD:
      return [...state, initialOrderItems];

    case ORDER_DETAILS_GET:
      return state;

    case ORDER_DETAILS_SET:
      state = action.payload;
      return state;

    case DELETE_ORDER_DETAILS_BY_ID:
      return await [
        ...state,
        (prevState: OrderItems[]) => {
          const previousState = [...prevState];
          const state = previousState.filter(
            (item, index) => index !== action.deleteIndex
          );
          return state;
        },
      ];

    case SET_ORDER_DERAILS_BY_FIELD_NAME:
      return await [
        ...state,
        (prevState: OrderItems[]) => {
          const previousState = [...prevState];
          previousState[action.index] = {
            ...previousState[action.index],
            [action.fieldName]: action.fieldValue,
          };
          return previousState;
        },
      ];

    case ORDER_DETAILS_CLEAR:
      return [];

    default:
      return state;
  }
};
