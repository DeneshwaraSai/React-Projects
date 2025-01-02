import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useSelector } from "react-redux";
import { initialOrderInfo } from "./order.initialState";
import {
  CashReceipt,
  initialCashReceipt,
  Order,
  OrderItems,
  OrderRequest,
} from "./Order.type";
import dayjs from "dayjs";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import { AgGridReact } from "ag-grid-react";
import store from "../../Store/store";
import { CodeValue } from "../../Cache/Cache.types";

function OrderInfo() {
  const [orderInfo, setOrderInfo] = useState<Order>(initialOrderInfo);
  const orderState = useSelector((state: any) => state.orderReducer.orderState);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [orderItemDetails, setOrderItemDetails] = useState<OrderItems[]>([]);
  const [cashReceipt, setCashReceipt] =
    useState<CashReceipt>(initialCashReceipt);
  const [rowData, setRowData] = useState<OrderItems[]>([]);
  const [paymentTypeCodeValue, setPaymentTypeCodeValue] = useState<CodeValue[]>(
    []
  );

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        if (res) {
          setPaymentTypeCodeValue(
            res.codeValue["PAYMENT_TYPE"] ? res.codeValue["PAYMENT_TYPE"] : []
          );
        }
      })
      .catch((err) => {
        throw new Error("Error while  fetching codeValues.");
      });
  }, []);

  const columnDefs: any[] = [
    {
      field: "drugName",
      fieldValue: "drugName",
    },
    {
      field: "quantity",
      fieldValue: "quantity",
    },
    {
      field: "Unit Price",
      fieldValue: "unitPrice",
    },
    {
      field: "Total Price",
      fieldValue: "totalPrice",
    },
    {
      field: "Discount %",
      fieldValue: "discountPerc",
    },
    {
      field: "Discount Amt",
      fieldValue: "discountAmount",
    },
  ];

  const defaultColDef = {
    editable: false,
    sortable: false,
    flex: 1,
    resizable: true,
  };

  const gridOptions = {
    columnDefs: columnDefs,
    checkboxSelection: false,
    onFirstDataRendered: (params: any) => {
      params.api.sizeColumnsToFit();
    },
  };

  const submitOrderInfo = async () => {
    await setOrderInfo({ ...orderInfo, orderDetails: orderState });

    console.log(orderState);
    console.log(orderInfo);

    const orderRequest: OrderRequest = {
      cashReceipt: cashReceipt,
      orderInfo: orderInfo,
    };

    try {
      await axios
        .post(PHARMACY_HOST_NAME + EndPoints.ORDER_CREATE, orderRequest)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      throw new Error("Error while  saving orders");
    }
  };

  const goToPayment = async () => {
    await setOrderInfo({ ...orderInfo, orderDetails: orderState });

    setOrderItemDetails(orderState);

    console.log(store.getState().orderReducer.orderState);

    setShowPayment(true);
  };

  const backToOrder = () => {
    setShowPayment(false);
  };

  const onChangeOrderInfo = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      {!showPayment && (
        <div>
          <div className="row">
            <div className="col">
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      name="Order Date"
                      value={dayjs(orderInfo.orderDate)}
                      label="Order Date"
                      onChange={(e) => onChangeOrderInfo(e)}
                    ></DatePicker>
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>

          <React.Fragment>
            <OrderDetails />
          </React.Fragment>

          <div style={{ display: "flex", float: "right" }}>
            <Button variant="outlined" style={{ margin: 5 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={goToPayment}
              style={{ margin: 5 }}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {showPayment && (
        <div>
          <div>
            <div
              className="ag-theme-quartz"
              style={{ width: "100%", padding: 6 }}
            >
              <AgGridReact
                rowData={orderItemDetails}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                suppressAutoSize={true}
                pagination={true}
                paginationPageSize={5}
                domLayout={"autoHeight"}
                gridOptions={gridOptions}
              ></AgGridReact>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <FormControl fullWidth>
                  <InputLabel> Payment Type </InputLabel>
                  <Select
                    label="Payment Type"
                    placeholder="Payment Type"
                    fullWidth
                  >
                    {paymentTypeCodeValue &&
                      paymentTypeCodeValue.map((codeValue) => {
                        return (
                          <MenuItem value={String(codeValue.code)}>
                            {codeValue.value}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Bill Amount"
                  label="Bill Amount"
                />
              </div>
              <div className="col">
                <TextField
                  type="number"
                  fullWidth
                  placeholder="Discount %"
                  label="Discount %"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Discount Amount"
                  label="Discount Amount"
                />
              </div>
              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  label="Received Amount"
                  placeholder="Received Amount"
                />
              </div>

              <div className="col">
                <TextField
                  fullWidth
                  label="Notes"
                  placeholder="Notes"
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </div>
            </div>
          </div>

          <Box style={{ display: "flex", float: "right" }}>
            <div>
              <Button variant="outlined" onClick={backToOrder}>
                Back
              </Button>
            </div>

            <div className="ms-2">
              <Button
                variant="contained"
                className="p2"
                onClick={submitOrderInfo}
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
}

export default OrderInfo;
