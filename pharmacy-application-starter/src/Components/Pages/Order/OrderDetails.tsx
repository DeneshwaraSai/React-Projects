import {
  Checkbox,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { orderTableHeaders } from "./order.initialState";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OrderSearch from "./OrderSearch";
import { OrderItems } from "./Order.type";
import { useDispatch, useSelector } from "react-redux";
import {
  ORDER_DETAILS_ADD,
  ORDER_DETAILS_CLEAR,
  SET_ORDER_DETAILS_BY_INDEX,
} from "./OrderRedux/Order.actions";
import dayjs from "dayjs";

function OrderDetails() {
  const dispatch = useDispatch();
  const orderState = useSelector((state: any) => state.orderReducer.orderState);
  const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

  useEffect(() => {
    dispatch({
      type: ORDER_DETAILS_CLEAR,
      payload: orderItems,
    });
    setOrderItems(orderState);
  }, []);

  const addDetails = (value: OrderItems) => {
    setOrderItems([...orderItems, value]);
    dispatch({
      type: ORDER_DETAILS_ADD,
      payload: value,
    });
  };

  const reCalculateUsingDiscounts = (
    index: number,
    fieldName: string,
    fieldValue: any
  ) => {
    setOrderItems((prevState: OrderItems[]) => {
      const state = [...prevState];

      let discountPerc: number = 0,
        discountAmount = 0;

      if (fieldName === "discountPerc") {
        discountPerc = Number(fieldValue);
        discountAmount = (state[index].totalPrice * discountPerc) / 100;
      } else {
        discountAmount = Number(fieldValue);
        discountPerc = (discountAmount * 100) / state[index].totalPrice;
      }

      state[index] = {
        ...state[index],
        discountAmount: discountAmount,
        discountPerc: discountPerc,
        netAmount: state[index].totalPrice - discountAmount,
      };

      return state;
    });
  };

  const onDetailsChangeQuantity = (index: number, e: any) => {
    setOrderItems((prevState: OrderItems[]) => {
      const state = [...prevState];
      const quantity: number = Number(e.target?.value);
      const totalprice: number = Number(
        parseFloat(String(state[index].unitPrice * quantity)).toFixed(2)
      );

      state[index] = {
        ...state[index],
        quantity: quantity,
        totalPrice: totalprice,
        discountAmount: (totalprice * state[index].discountPerc) / 100,
        netAmount:
          state[index].unitPrice * quantity -
          state[index].discountAmount +
          (state[index].totalPrice * state[index].sgst) / 100 +
          (state[index].totalPrice * state[index].cgst) / 100,
      };
      dispatch({
        type: SET_ORDER_DETAILS_BY_INDEX,
        payload: state[index],
        index: index,
      });
      return state;
    });
  };

  return (
    <div>
      <div>
        <OrderSearch addDetails={addDetails}></OrderSearch>
      </div>

      <TableContainer component={Paper} key="tables">
        <Table>
          <TableHead style={{ height: "25px !important" }}>
            <TableRow>
              {orderTableHeaders &&
                orderTableHeaders.map((item, index) => {
                  return <TableCell key={`key-${index}`}> {item} </TableCell>;
                })}
            </TableRow>
          </TableHead>

          <TableBody>
            {orderItems &&
              orderItems.length > 0 &&
              orderItems.map((item: OrderItems, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 200 }}
                        fullWidth
                        size="small"
                        value={item.drugName}
                        placeholder="name"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 200 }}
                        fullWidth
                        value={item.supplierName}
                        size="small"
                        placeholder="Supplier"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 200 }}
                        fullWidth
                        size="small"
                        value={item.batchNumber}
                        placeholder="Batch Number"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        fullWidth
                        value={item.taxCategory}
                        size="small"
                        placeholder="Hsn Code"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              name="expiryDate"
                              value={dayjs(item.expiryDate)}
                              label="Expiry Date"
                              disabled
                            ></DatePicker>
                          </DemoContainer>
                        </LocalizationProvider>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        type="number"
                        fullWidth
                        value={item.quantity}
                        name="quantity"
                        onInput={(e) => {
                          onDetailsChangeQuantity(index, e);
                        }}
                        size="small"
                        placeholder="Quantity"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        type="number"
                        fullWidth
                        size="small"
                        disabled
                        value={item.unitPrice}
                        placeholder="Price"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        type="number"
                        fullWidth
                        size="small"
                        disabled
                        value={item.totalPrice}
                        placeholder="Total Price"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        type="number"
                        fullWidth
                        size="small"
                        name="discountPerc"
                        value={item.discountPerc}
                        onChange={(e) => {
                          reCalculateUsingDiscounts(
                            index,
                            e.target.name,
                            e.target.value
                          );
                        }}
                        placeholder="Discount %"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        type="number"
                        value={item.discountAmount}
                        fullWidth
                        size="small"
                        name="discountAmount"
                        onChange={(e) => {
                          reCalculateUsingDiscounts(
                            index,
                            e.target.name,
                            e.target.value
                          );
                        }}
                        placeholder="Discount Amount"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        type="number"
                        fullWidth
                        size="small"
                        disabled
                        value={item.netAmount}
                        placeholder="Net Amount"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderDetails;
