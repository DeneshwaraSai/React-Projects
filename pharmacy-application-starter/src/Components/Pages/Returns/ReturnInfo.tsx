import React, { useEffect } from "react";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

const ReturnInfo = () => {
  const columnDefs = [
    { headerName: "Supplier Name", field: "firstName" },
    { headerName: "Batch Number", field: "firstName" },
    { headerName: "Drug Name", field: "firstName" },
    { headerName: "Quality", field: "firstName" },
    { headerName: "Returned Quantity", field: "firstName" },
    {
      headerName: "Now Returning Quantity",
      field: "firstName",
      editable: true,
    },
    { headerName: "Unit Price", field: "firstName" },
    { headerName: "Total Price", field: "firstName" },
    { headerName: "Discount Amount", field: "firstName" },
    { headerName: "Discount Perc", field: "firstName" },
    { headerName: "Taxes", field: "firstName" },
    { headerName: "Batch Number", field: "firstName" },
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

  useEffect(() => {});

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
                  // value={dayjs(this.state.orderInfo.orderDate)}
                  label="Order Date"
                  maxDate={dayjs(new Date())}
                  onChange={(e) => {
                    console.log(e);
                  }}
                ></DatePicker>
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="ag-theme-quartz" style={{ width: "100%", padding: 6 }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressAutoSize={true}
          domLayout={"autoHeight"}
          gridOptions={gridOptions}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default ReturnInfo;
