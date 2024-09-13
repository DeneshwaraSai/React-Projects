import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import React from "react";
import OrderDetails from "./OrderDetails";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import store from "../../Store/store";
import { useSelector } from "react-redux";

function OrderInfo() {
  const orderState = useSelector((state: any) => state.orderReducer.orderState);
  const submitOrderInfo = () => {
    console.log(orderState);

    console.log(store.getState().orderReducer.orderState);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  sx={{ width: "100%" }}
                  name="Order Date"
                  // value={dayjs("")}
                  label="Order Date"
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
          onClick={submitOrderInfo}
          style={{ margin: 5 }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default OrderInfo;
