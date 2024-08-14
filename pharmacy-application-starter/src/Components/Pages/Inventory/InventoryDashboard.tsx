import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";

import "./InventoryDashboard.style.css";
import store from "../../Store/store";
import { CodeValue } from "../../Cache/Cache.types";
import { InventoryDashboardType, InventorySearch } from "./Inventory.type";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";

function InventoryDashboard() {
  const inventorySearchInitialState: InventorySearch = {
    supplierName: "",
    invoiceNumber: "",
    drugName: "",
    toDate: "",
    status: "",
  };

  const navigate = useNavigate();
  const [inventoryStatusCodeValue, setInventoryStatusCodeValue] = useState<
    CodeValue[]
  >([]);
  const [inventorySearch, setInventorySearch] = useState<InventorySearch>(
    inventorySearchInitialState
  );
  const [rowData, setRowData] = useState<InventoryDashboardType[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<InventoryDashboardType[]>(
    []
  );
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        setInventoryStatusCodeValue(
          res.codeValue["INVENTORY_STATUS"]
            ? res.codeValue["INVENTORY_STATUS"]
            : []
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getDashboardDetails();
  }, []);

  const getDashboardDetails = () => {
    axios
      .get(PHARMACY_HOST_NAME + EndPoints.INVENTORY_DASHBOARD)
      .then((res) => {
        console.log(res.data);
        const data: InventoryDashboardType[] = [
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
          res.data[0],
        ];

        setRowData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeSearch = (field: string, value: any) => {
    setInventorySearch({
      ...inventorySearch,
      [field]: value,
    });
  };

  const submitInventorySearch = () => {
    console.log(inventorySearch);
  };

  const createInventory = () => {
    navigate("/inventory/create");
  };

  const updateInventory = () => {
    // navigate(`/inventory/update/1`);
    console.log(selectedData);
  };

  const colDefs: any[] = [
    {
      width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Supplier Name", field: "supplierCode" },
    { headerName: "Inventory Number", field: "inventoryNumber", width: 150 },
    { headerName: "Invoice Number", field: "invoiceNumber", width: 140 },
    {
      headerName: "Invoice Date",
      field: "invoiceDate",
      valueGetter: (params: any) => {
        return moment(params.data.invoiceDate).format("DD MMM YYYY");
      },
      width: 140,
    },
    { headerName: "Invoice Amount", field: "invoiceAmt", width: 140 },
    { headerName: "Created By", field: "createdBy" },
    {
      headerName: "Status",
      field: "status",
      width: 150,
      valueGetter: (params: any) => {
        for (let codeValue of inventoryStatusCodeValue) {
          if (codeValue.code === params.data.status) {
            return codeValue.value;
          }
        }
        return params.data.status;
      },
    },

    {
      headerName: "",
      field: "",
      width: 100,
      cellRenderer: () => {
        return (
          <div>
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              <PiIcons.PiDotsThreeOutlineVerticalFill />
            </IconButton>
            {menuOpen && (
              <div
                className="menu"
                style={{
                  position: "absolute",
                  top: "30px",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="menu-item">Menu Item 1</div>
                <div className="menu-item">Menu Item 2</div>
                <div className="menu-item">Menu Item 3</div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const gridOptions = {
    columnDefs: colDefs,
    checkboxSelection: true,
    onFirstDataRendered: (params: any) => {
      params.api.sizeColumnsToFit();
    },
    onGridReady: (params: any) => {
      setGridApi(params.api);
    },
    onSelectionChanged: (params: any) => {
      const selectedRows = params.api.getSelectedRows();
      setSelectedData(selectedRows);
    },
  };

  return (
    <div>
      <Card style={{ padding: "10px" }}>
        <div className="">
          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                name="supplierName"
                onChange={(e) => onChangeSearch(e.target.name, e.target.value)}
                placeholder="Supplier Name"
                label="Supplier Name"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                name="invoiceNumber"
                value={inventorySearch.invoiceNumber}
                onChange={(e) => onChangeSearch(e.target.name, e.target.value)}
                placeholder="Invoice Number"
                label="Invoice Number"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                name="drugName"
                value={inventorySearch.drugName}
                onChange={(e) => onChangeSearch(e.target.name, e.target.value)}
                placeholder="Drug name"
                label="Drug name"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField
                name="toDate"
                value={inventorySearch.toDate}
                onChange={(e) => onChangeSearch(e.target.name, e.target.value)}
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: new Date().toISOString().split("T")[0],
                    pattern: "^[0-9]{2}-[0-9]{2}-[0-9]{4}$",
                  },
                }}
                placeholder="To Date"
                label="To Date"
              />
            </div>

            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="status"> Status </InputLabel>
                <Select
                  labelId="status"
                  label="status"
                  id="status"
                  placeholder="Status"
                  name="status"
                  value={inventorySearch.status}
                  onChange={(e) =>
                    onChangeSearch(e.target.name, e.target.value)
                  }
                >
                  {inventoryStatusCodeValue.length > 0 &&
                    inventoryStatusCodeValue.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code + ""}>
                          {item.value}
                        </MenuItem>
                      );
                    })}

                  {inventoryStatusCodeValue.length === 0 && (
                    <MenuItem key={0}> No Options </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <div className="col">
              <div style={{ display: "flex", float: "right" }}>
                <div className="button-padding">
                  <Button variant="outlined"> Clear </Button>
                </div>
                <div className="button-padding">
                  <Button
                    variant="contained"
                    onClick={() => submitInventorySearch()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <br></br>
      <div style={{ display: "flex", float: "right" }}>
        <div className="button-padding">
          <Button
            variant="contained"
            onClick={() => createInventory()}
            startIcon={<IoIcons.IoMdAddCircle />}
          >
            Create
          </Button>
        </div>
        <div className="button-padding">
          <Button
            variant="contained"
            onClick={() => updateInventory()}
            disabled={!(selectedData && selectedData.length === 1)}
            startIcon={<FaIcons.FaEdit />}
          >
            Update
          </Button>
        </div>
        <div className="button-padding">
          <Button
            variant="outlined"
            startIcon={<MdIcons.MdDelete />}
            color="error"
            disabled={!(selectedData && selectedData.length === 1)}
          >
            Delete
          </Button>
        </div>
      </div>
      <br></br> <br></br> <br></br>
      <Card style={{ padding: "10px" }}>
        <div className="ag-theme-quartz" style={{ width: "100%", padding: 6 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            domLayout={"autoHeight"}
            pagination={true}
            paginationPageSize={5}
            defaultColDef={{ resizable: true }}
            suppressAutoSize={true}
            gridOptions={gridOptions}
          />
        </div>
      </Card>
    </div>
  );
}

export default InventoryDashboard;
