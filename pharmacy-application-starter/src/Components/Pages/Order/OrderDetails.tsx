import {
  Button,
  Card,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useState } from "react";
import { OrderItems } from "./Order.type";
import { initialOrderItems, orderTableHeaders } from "./order.initialState";

function OrderDetails() {
  const [orderItems, setOrderItems] = useState<OrderItems[]>([
    initialOrderItems,
    initialOrderItems,
    initialOrderItems,
  ]);

  const addItems = () => {
    setOrderItems([...orderItems, initialOrderItems]);
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={() => addItems()}>
          Add
        </Button>
      </div>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                key="headKey1"
                style={{ height: 20, padding: 0, margin: 0 }}
              >
                {orderTableHeaders.map((item, index) => {
                  return (
                    <TableCell
                      sx={{ border: "1px solid #A9A9A9", fontWeight: "bold" }}
                    >
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {orderItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <TableRow
                      style={{ height: 16, padding: 0, margin: 0 }}
                      key={index}
                    >
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          style={{ width: "200px" }}
                          name="name"
                          size="small"
                          placeholder="Name"
                          label="Name"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="supplier"
                          style={{ width: "200px" }}
                          size="small"
                          placeholder="Supplier"
                          label="Supplier"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="batchNumber"
                          style={{ width: "130px" }}
                          size="small"
                          placeholder="Batch Number"
                          label="Batch Number"
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="mumber"
                          name="hsnCode"
                          size="small"
                          placeholder="HSN Code"
                          style={{ width: "105px" }}
                          label="HSN Code"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <FormControl size="small" fullWidth>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                name="expiryDate"
                                value={dayjs("2024-12-12")}
                                label="Expiry Date"
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </FormControl>
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="mumber"
                          name="1uantity"
                          placeholder="Quantity"
                          style={{ width: "90px" }}
                          label="Quantity"
                          size="small"
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="mumber"
                          name="price"
                          size="small"
                          placeholder="Price"
                          style={{ width: "90px" }}
                          label="Price"
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="mumber"
                          name="totalPrice"
                          placeholder="Total Price"
                          style={{ width: "120px" }}
                          label="Total Price"
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="discountPerc"
                          size="small"
                          placeholder="Discount Perc"
                          style={{ width: "110px" }}
                          label="Discount %"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="discountAmt"
                          size="small"
                          placeholder="Discount Amt"
                          style={{ width: "130px" }}
                          label="Discount Amt"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="netAmount"
                          size="small"
                          placeholder="Net Amount"
                          style={{ width: "130px" }}
                          label="Net Amount"
                        />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default OrderDetails;
