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
  SET_ORDER_DERAILS_BY_FIELD_NAME,
  SET_ORDER_DETAILS_BY_INDEX,
} from "./OrderRedux/Order.actions";
import dayjs from "dayjs";
import { StringSupport } from "../../common/StringSupport";

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

  const reCalculateAllByQuantity = (index: number) => {
    setOrderItems((prevState: OrderItems[]) => {
      const state = [...prevState];
      const taxes =
        (state[index].totalPrice * state[index].sgst) / 100 +
        (state[index].totalPrice * state[index].cgst) / 100;
      state[index] = {
        ...state[index],
        netAmount: Number(
          parseFloat(
            String(
              state[index].totalPrice - state[index].discountAmount + taxes
            )
          ).toFixed(2)
        ),
      };
      return state;
    });
  };

  const onDetailsChangeQuantity = (index: number, e: any) => {
    setOrderItems((prevState: OrderItems[]) => {
      const state = [...prevState];
      state[index] = {
        ...state[index],
        quantity: Number(e.target?.value),
        totalPrice: state[index].unitPrice * e.target?.value,
        netAmount:
          state[index].unitPrice * Number(e.target?.value) -
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ height: "25px !important" }}>
            <TableRow>
              {orderTableHeaders &&
                orderTableHeaders.map((item) => {
                  return <TableCell> {item} </TableCell>;
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
                        value={item.discountPerc}
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
