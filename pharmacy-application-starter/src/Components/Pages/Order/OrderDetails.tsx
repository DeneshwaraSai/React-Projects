import {
  Button,
  Card,
  Checkbox,
  FormControl,
  IconButton,
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
import React, { useEffect, useState } from "react";
import { OrderItems } from "./Order.type";
import { initialOrderItems, orderTableHeaders } from "./order.initialState";
import OrderSearch from "./OrderSearch";
import { useDispatch } from "react-redux";
import {
  DELETE_ORDER_DETAILS_BY_ID,
  ORDER_DETAILS_ADD,
  ORDER_DETAILS_SET,
  SET_ORDER_DERAILS_BY_FIELD_NAME,
} from "./OrderRedux/Order.actions";
import store from "../../Store/store";
import * as MdIcons from "react-icons/md";
import { AgGridReact } from "ag-grid-react";

function OrderDetails() {
  const dispatch = useDispatch();

  const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

  useEffect(() => {
    dispatch({
      type: ORDER_DETAILS_SET,
      payload: [initialOrderItems, initialOrderItems],
    });

    setOrder();
  }, []);

  const addItems = async () => {
    await dispatch({
      type: ORDER_DETAILS_ADD,
    });

    setOrder();
    setOrderItems([...orderItems, initialOrderItems]);
  };

  const setOrder = () => {
    store.getState().orderReducer.then((res: any[]) => {
      setOrderItems(res);
    });
  };

  const onChangeOrderItems = async (
    index: number,
    fieldName: string,
    fieldValue: any
  ) => {
    dispatch({
      type: SET_ORDER_DERAILS_BY_FIELD_NAME,
      deleteIndex: 0,
      fieldName: fieldName,
      fieldValue: fieldValue,
      index: index,
      payload: [],
    });

    setOrder();
  };

  const deleteRecord = (index: number) => {
    dispatch({
      type: DELETE_ORDER_DETAILS_BY_ID,
      deleteIndex: index,
    });

    setOrder();
  };

  const columnDefs: any[] = [
    {
      width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "batchNumber",
      headerName: "Batch Number",
    },
    {
      field: "hsnCode",
      headerName: "HSN Code",
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
    },
    {
      field: "discountPerc",
      headerName: "Discount Perc",
      editable: true,
    },
    {
      field: "discountAmt",
      headerName: "Discount Amt",
      editable: true,
    },
    {
      field: "netAmount",
      headerName: "Net Amount",
    },
  ];

  const gridOptions = {
    columnDefs: columnDefs,
    checkboxSelection: true,
    onFirstDataRendered: (params: any) => {
      params.api.sizeColumnsToFit();
    },
  };

  return (
    <div>
      <OrderSearch></OrderSearch>

      <div style={{ float: "right" }}>
        <Button variant="contained" onClick={() => addItems()}>
          Add
        </Button>
      </div>

      <br></br>
      <br></br>

      <Card>
        <TableContainer>
          <Table>
            <TableHead key="head">
              <TableRow
                key="headKey1"
                style={{ height: 20, padding: 0, margin: 0 }}
              >
                {orderTableHeaders.map((item, index) => {
                  return (
                    <TableCell
                      key={index}
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
                          disabled
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="supplier"
                          style={{ width: "200px" }}
                          size="small"
                          placeholder="Supplier"
                          label="Supplier"
                          disabled
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          name="batchNumber"
                          style={{ width: "130px" }}
                          size="small"
                          placeholder="Batch Number"
                          label="Batch Number"
                          disabled
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
                          disabled
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
                                disabled
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </FormControl>
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="mumber"
                          name="quantity"
                          onChange={(event) =>
                            onChangeOrderItems(
                              index,
                              event.target.name,
                              event.target.value
                            )
                          }
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
                          disabled
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
                          disabled
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
                          disabled
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <IconButton onClick={() => deleteRecord(index)}>
                          <MdIcons.MdDelete
                            color="error"
                            style={{ color: "red" }}
                            size={25}
                          ></MdIcons.MdDelete>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card style={{ padding: "10px" }}>
        <div className="ag-theme-quartz" style={{ width: "100%", padding: 6 }}>
          <AgGridReact
            rowData={orderItems}
            columnDefs={columnDefs}
            domLayout={"autoHeight"}
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{ resizable: true }}
            suppressAutoSize={true}
          />
        </div>
      </Card>
    </div>
  );
}

export default OrderDetails;
