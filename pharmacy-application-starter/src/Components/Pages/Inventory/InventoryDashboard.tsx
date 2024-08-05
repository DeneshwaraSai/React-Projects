import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import "./InventoryDashboard.style.css";
import store from "../../Store/store";
import { CodeValue } from "../../Cache/Cache.types";
import { InventorySearch } from "./Inventory.type";
import { useNavigate } from "react-router-dom";

function InventoryDashboard() {
  const inventorySearchInitialState: InventorySearch = {
    supplierName: "",
    invoiceNumber: "",
    drugName: "",
    toDate: "",
    status: "",
  };

  const navigate = useNavigate();
  const [statusCodeValue, setStatusCodeValue] = useState<CodeValue[]>([]);
  const [inventorySearch, setInventorySearch] = useState<InventorySearch>(
    inventorySearchInitialState
  );

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        setStatusCodeValue(
          res.codeValue["INVENTORY_STATUS"]
            ? res.codeValue["INVENTORY_STATUS"]
            : []
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    navigate(`/inventory/update/1`);
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
                  {statusCodeValue.length > 0 &&
                    statusCodeValue.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code + ""}>
                          {item.value}
                        </MenuItem>
                      );
                    })}

                  {statusCodeValue.length === 0 && (
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
                    {" "}
                    Submit{" "}
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
          >
            Delete
          </Button>
        </div>
      </div>
      <br></br> <br></br> <br></br>
      <Card style={{ padding: "10px" }}> Table </Card>
    </div>
  );
}

export default InventoryDashboard;
