import { initialOrderItems } from "../order.initialState";
import { OrderItems } from "../Order.type";
import {
  DELETE_ORDER_DETAILS_BY_ID,
  ORDER_DETAILS_ADD,
  ORDER_DETAILS_CLEAR,
  ORDER_DETAILS_GET,
  ORDER_DETAILS_SET,
  SET_ORDER_DETAILS_BY_INDEX,
} from "./Order.actions";

export type OrderReducerAction = {
  type: string;
  deleteIndex: number;
  fieldName: string;
  fieldValue: any;
  index: number;
  payload: OrderItems;
};

export const initialOrderState = {
  orderState: [],
};

export const OrderReducer = (
  state = initialOrderState,
  action: OrderReducerAction
) => {
  console.log(state.orderState);
  switch (action.type) {
    case ORDER_DETAILS_ADD:
      return {
        ...state,
        orderState: [...state.orderState, action.payload],
      };

    case ORDER_DETAILS_GET:
      return state;

    case ORDER_DETAILS_SET:
      return {
        ...state,
        orderState: action.payload,
      };

    case SET_ORDER_DETAILS_BY_INDEX:
      const prevState = state.orderState.map(
        (item: OrderItems, index: number) => {
          if (index === action.index) {
            return { ...item, ...action.payload };
          }
          return item;
        }
      );

      console.log(prevState);

      return {
        ...state,
        orderState: prevState,
        // orderState: state.orderState.map((item: OrderItems, index: number) => {
        //   console.log(index === action.index);
        //   console.log("has a change");
        //   if (index === action.index) {
        //     return { ...item, ...action.payload };
        //   }
        //   console.log("No change");
        //   return item;
        // }),
      };

    case DELETE_ORDER_DETAILS_BY_ID:
      return state;

    case ORDER_DETAILS_CLEAR:
      return {
        ...state,
        orderState: [],
      };

    default:
      return state;
  }
};
