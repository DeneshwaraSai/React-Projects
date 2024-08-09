import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CodeValue } from "../../Cache/Cache.types";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import { Inventory } from "./Inventory.type";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
export type PropInventory = {
  inventory: Inventory;
  setInventory: any;
};
function InventoryParent({ inventory, setInventory }: PropInventory) {
  const [supplierCodeValue, setSupplierCodeValue] = useState<CodeValue[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      console.log("In useEffect");
      isFirstRender.current = false;
      loadPreApis();
    }
  }, []);

  const loadPreApis = async () => {
    await axios
      .get(PHARMACY_HOST_NAME + EndPoints.SUPPLIER_CODE_VALUE)
      .then((res) => setSupplierCodeValue(res.data))
      .catch((err) => console.log(err));
  };

  const onChangeEvent = (fieldName: string, fieldValue: any) => {
    setInventory(fieldName, fieldValue);
  };

  const onDateChange = (date: any) => {
    setInventory("invoiceDate", date?.$d);
  };

  return (
    <div>
      <div>
        <Card style={{ padding: "10px" }}>
          <div className="">
            <div className="row">
              <div className="col">
                <FormControl fullWidth>
                  <InputLabel id="supplierCode"> Supplier Name </InputLabel>
                  <Select
                    value={inventory.supplierCode}
                    labelId="supplierCode"
                    name="supplierCode"
                    label="Supplier Name"
                    onChange={(e) =>
                      onChangeEvent(e.target.name, e.target.value)
                    }
                    placeholder="Supplier Name"
                  >
                    {supplierCodeValue.map((item, index) => {
                      return (
                        <MenuItem value={String(item.code)}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>

              <div className="col">
                <TextField
                  fullWidth
                  name="invoiceNumber"
                  value={inventory.invoiceNumber}
                  onChange={(e) => onChangeEvent(e.target.name, e.target.value)}
                  placeholder="In-voice Number"
                  label="In-voice Number"
                />
              </div>

              <div className="col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="invoiceDate"
                      label="Invoice Date"
                      value={dayjs(inventory.invoiceDate)}
                      onChange={onDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Overall Discount %"
                  label="Overall Discount %"
                />
              </div>
              <div className="col">
                <TextField
                  type="number"
                  fullWidth
                  placeholder="Overall Discount Amount"
                  label="Overall Discount Amount"
                />
              </div>

              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  name="invoiceAmt"
                  value={inventory.invoiceAmt}
                  onChange={(e) => onChangeEvent(e.target.name, e.target.value)}
                  placeholder="Invoice Amount"
                  label="Invoice Amount"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  fullWidth
                  name="notes"
                  value={inventory.notes}
                  onChange={(e) => onChangeEvent(e.target.name, e.target.value)}
                  placeholder="Notes"
                  label="Notes"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default InventoryParent;
