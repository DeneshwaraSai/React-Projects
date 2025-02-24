import React, { Component } from "react";
import { initialCashReceipt, OrderItems, OrderState } from "./Order.type";
import {
  Alert,
  Box,
  Button,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import OrderSearch from "./OrderSearch";
import { orderTableHeaders } from "./order.initialState";
import { AgGridReact } from "ag-grid-react";
import OrderPayment from "./OrderPayment";

export class OrderInfo extends Component {
  state: OrderState = {
    orderInfo: {
      orderNumber: "",
      sequenceNumber: "",
      billNumber: "",
      transactionId: "",
      orderDate: new Date(),
      lastModifiedDate: new Date(),
      uhid: 0,
      status: "",
      amountPaid: 0,
      dueAmount: 0,
      createdBy: "",
      lastModifiedBy: "",
      orderDetails: [],
    },
    cashReceipt: initialCashReceipt,
    orderItems: [],
    showPayment: false,
    errorMessage: [],
  };

  columnDefs: any[] = [
    {
      field: "drugName",
      fieldValue: "Drug Name",
    },
    {
      field: "quantity",
      fieldValue: "Quantity",
    },
    {
      field: "unitPrice",
      fieldValue: "Unit Price",
    },
    {
      field: "totalPrice",
      fieldValue: "Total Price",
    },
    {
      field: "discountPerc",
      fieldValue: "Discount %",
    },
    {
      field: "discountAmount",
      fieldValue: "Discount Amt",
    },
    {
      field: "taxes",
      fieldValue: "Taxes",
      cellRenderer: (params: any) => {
        const taxes =
          Number(params.data.sgstAmount) + Number(params.data.cgstAmount);
        return `${taxes}`;
      },
    },

    {
      field: "netAmount",
      fieldValue: "Net Amount",
    },
  ];

  defaultColDef = {
    editable: false,
    sortable: false,
    flex: 1,
    resizable: true,
  };

  gridOptions = {
    columnDefs: this.columnDefs,
    checkboxSelection: false,
    onFirstDataRendered: (params: any) => {
      params.api.sizeColumnsToFit();
    },
  };

  onChangeOrderInfo = (e: any) => {
    console.log(e);
  };

  getGstPrices(totalPrice: Number, discountAmount: Number, gst: Number) {
    return Number(
      parseFloat(
        String(
          ((Number(totalPrice) - Number(discountAmount)) * Number(gst)) / 100
        )
      ).toFixed(2)
    );
  }

  addDetails = (value: OrderItems) => {
    console.log(value);
    value.totalPrice = value.quantity * value.unitPrice - value.discountAmount;
    value.netAmount =
      value.totalPrice +
      this.getGstPrices(value.totalPrice, value.discountAmount, value.cgst) +
      this.getGstPrices(value.totalPrice, value.discountAmount, value.sgst);
    value.sgstAmount = this.getGstPrices(
      value.totalPrice,
      value.discountAmount,
      value.sgst
    );
    value.cgstAmount = this.getGstPrices(
      value.totalPrice,
      value.discountAmount,
      value.cgst
    );
    this.setState({
      ...this.state,
      orderItems: [...this.state.orderItems, value],
    });
  };

  validateForNext = () => {
    this.setState({ errorMessage: [] });

    if (this.state.orderItems) {
      for (const items of this.state.orderItems) {
        if (items.quantity <= 0) {
          this.setState((prevState: OrderState) => {
            const errorMessage = `The quantity of ${items.drugName} cannot be 0.`;
            if (!prevState.errorMessage.includes(errorMessage)) {
              prevState.errorMessage.push(errorMessage);
            }
            return prevState;
          });
        }
        if (items.discountAmount < 0 || items.discountPerc < 0) {
          this.setState((prevState: OrderState) => {
            const errorMessage = `The discount % or amount of ${items.drugName} cannot be negative.`;

            if (!prevState.errorMessage.includes(errorMessage)) {
              prevState.errorMessage.push(errorMessage);
            }
            return prevState;
          });
        }
      }
    }
    return this.state.errorMessage.length == 0;
  };

  goToPayment = async () => {
    if (this.validateForNext()) {
      this.setState({ showPayment: true });
    }
  };

  goBack = async () => {
    this.setState({ showPayment: false });
  };

  onDetailsChangeQuantity = (index: number, e: any) => {
    const quantity: number = Number(e.target?.value);
    const totalprice: number =
      this.state.orderItems[index].unitPrice * quantity;

    const discountAmount: number = Number(
      (totalprice * this.state.orderItems[index].discountPerc) / 100
    );

    this.setState((prevState: OrderState) => ({
      ...prevState,
      orderItems: prevState.orderItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: quantity,
            discountAmount: discountAmount,
            totalPrice: totalprice - discountAmount,
            netAmount: Number(
              parseFloat(
                String(
                  totalprice -
                    discountAmount +
                    this.getGstPrices(totalprice, discountAmount, item.sgst) +
                    this.getGstPrices(totalprice, discountAmount, item.cgst)
                )
              ).toFixed(2)
            ),
            cgstAmount: this.getGstPrices(
              totalprice,
              discountAmount,
              item.cgst
            ),
            sgstAmount: this.getGstPrices(
              totalprice,
              discountAmount,
              item.sgst
            ),
          };
        }
        return item;
      }),
    }));
  };

  reCalculateUsingDiscounts = (
    index: number,
    fieldName: string,
    fieldValue: any
  ) => {
    let discountPerc: number = 0,
      discountAmount: number = 0;

    this.setState((prevState: OrderState) => ({
      ...prevState,
      orderItems: prevState.orderItems.map((item, idx) => {
        if (fieldName === "discountPerc") {
          discountPerc = Number(fieldValue);
          discountAmount =
            (item.quantity * item.unitPrice * discountPerc) / 100;
        } else {
          discountAmount = Number(fieldValue);
          discountPerc =
            (discountAmount * 100) / (item.quantity * item.unitPrice);
        }

        if (idx === index) {
          const totalPrice: Number = Number(
            parseFloat(
              String(item.quantity * item.unitPrice - discountAmount)
            ).toFixed(2)
          );

          return {
            ...item,
            discountPerc: discountPerc,
            discountAmount: discountAmount,
            totalPrice: totalPrice,
            netAmount: Number(
              parseFloat(
                String(
                  Number(totalPrice) +
                    this.getGstPrices(totalPrice, 0, item.sgst) +
                    this.getGstPrices(totalPrice, 0, item.cgst)
                )
              ).toFixed(2)
            ),
            cgstAmount: this.getGstPrices(totalPrice, 0, item.cgst),
            sgstAmount: this.getGstPrices(totalPrice, 0, item.sgst),
          };
        }
        return item;
      }),
    }));
  };

  onChangePayment = (fieldName: string, fieldValue: number | String) => {
    this.setState((prevState: OrderState) => ({
      ...prevState,
      cashReceipt: { ...prevState.cashReceipt, [fieldName]: fieldValue },
    }));
  };

  showTaxes = (item: OrderItems) => {
    return (
      <Box className="show-taxes">
        <p style={{ padding: 0, margin: 0 }}> SGST : {item.sgstAmount} </p>
        <p style={{ padding: 0, margin: 0 }}> CGST : {item.cgstAmount} </p>
        <p style={{ padding: 0, margin: 0 }}>
          Total : {item.cgstAmount + item.sgstAmount}
        </p>
      </Box>
    );
  };

  render() {
    return (
      <div key={"main-order-page"}>
        {this.state.errorMessage.length}
        {this.state.errorMessage.length > 0 &&
          this.state.errorMessage.map((message, index) => {
            return (
              <Box>
                <Alert onClose={() => {}} variant="filled" severity="error">
                  {message}
                </Alert>
              </Box>
            );
          })}

        {!this.state.showPayment && (
          <div key={"order-page"}>
            <div className="row">
              <div className="col">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        sx={{ width: "100%" }}
                        name="Order Date"
                        value={dayjs(this.state.orderInfo.orderDate)}
                        label="Order Date"
                        maxDate={dayjs(new Date())}
                        onChange={(e) => this.onChangeOrderInfo(e)}
                      ></DatePicker>
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>

            <div>
              <OrderSearch addDetails={this.addDetails}></OrderSearch>
            </div>

            {this.state.orderItems && this.state.orderItems.length > -1 && (
              <div>
                <TableContainer component={Paper} key="tables">
                  <Table>
                    <TableHead style={{ height: "25px !important" }}>
                      <TableRow>
                        {orderTableHeaders &&
                          orderTableHeaders.map((item, index) => {
                            return (
                              <TableCell
                                sx={{
                                  padding: 1,
                                  margin: 0,
                                  fontWeight: "bold",
                                }}
                                key={`key-${index}`}
                              >
                                {" "}
                                {item}{" "}
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.orderItems &&
                        this.state.orderItems.length > 0 &&
                        this.state.orderItems.map((item: OrderItems, index) => {
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
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
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
                                    this.onDetailsChangeQuantity(index, e);
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
                                  name="discountPerc"
                                  value={item.discountPerc}
                                  onChange={(e) => {
                                    this.reCalculateUsingDiscounts(
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
                                    this.reCalculateUsingDiscounts(
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
                                  value={item.totalPrice}
                                  placeholder="Total Price"
                                />
                              </TableCell>

                              <TableCell>
                                <div style={{ width: 100 }}>
                                  {this.showTaxes(item)}
                                </div>
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

                <div style={{ display: "flex", float: "right" }}>
                  <Button variant="outlined" style={{ margin: 5 }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={this.goToPayment}
                    style={{ margin: 5 }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {this.state.showPayment && (
          <div key={"Payment-page"}>
            <Box>
              <Box
                className="ag-theme-quartz"
                style={{ width: "100%", padding: 6 }}
              >
                <AgGridReact
                  rowData={this.state.orderItems}
                  columnDefs={this.columnDefs}
                  defaultColDef={this.defaultColDef}
                  suppressAutoSize={true}
                  domLayout={"autoHeight"}
                  gridOptions={this.gridOptions}
                />
              </Box>

              <OrderPayment
                cashReceipt={this.state.cashReceipt}
                onChangePayment={this.onChangePayment}
              />

              <Button
                variant="outlined"
                style={{ margin: 5 }}
                onClick={this.goBack}
              >
                Back
              </Button>

              <Button
                variant="contained"
                style={{ margin: 5 }}
                onClick={() => {
                  console.log(this.state);
                  console.log(this.state.cashReceipt);
                }}
              >
                Submit
              </Button>
            </Box>
          </div>
        )}
      </div>
    );
  }
}

export default OrderInfo;
