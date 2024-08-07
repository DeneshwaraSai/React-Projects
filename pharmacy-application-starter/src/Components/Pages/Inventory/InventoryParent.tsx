import { Button, Card, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CodeValue } from "../../Cache/Cache.types";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import InventoryChild from "./InventoryChild";
import { DrugInfo } from "../Setups/Drug/DrugInfo.type";
import InventoryPayment from "./InventoryPayment";
import { InventoryDetails } from "./Inventory.type";
import { inventoryChildInitialState } from "./Inventory.initialState";

function InventoryParent() {
  const [supplierCodeValue, setSupplierCodeValue] = useState<CodeValue[]>([]);
  const [drugList, setDrugList] = useState<DrugInfo[]>([]);
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

    await axios
      .get(PHARMACY_HOST_NAME + EndPoints.DRUG_LIST)
      .then((res) => setDrugList(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="inventory">
      <div>
        <Card style={{ padding: "10px" }}>
          <div className="">
            <div className="row">
              <div className="col">
                <TextField fullWidth placeholder="Supplier Name" />
              </div>

              <div className="col">
                <TextField fullWidth placeholder="In-voice Number" />
              </div>

              <div className="col">
                <TextField fullWidth type="date" placeholder="In-voice Date" />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Overall Discount %"
                />
              </div>
              <div className="col">
                <TextField
                  type="number"
                  fullWidth
                  placeholder="Overall Discount Amount"
                />
              </div>

              <div className="col">
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Invoice Amount"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField fullWidth placeholder="Notes" />
              </div>
            </div>
          </div>
        </Card>

        <br></br>

        <InventoryChild   />

        <br></br>

        <InventoryPayment />
        <br></br>
        <div style={{ display: "flex", float: "right", marginBottom: 12 }}>
          <div style={{ marginRight: 6 }}>
            <Button variant="outlined"> cancel </Button>
          </div>
          <div style={{ marginLeft: 6 }}>
            <Button variant="contained"> submit </Button>
          </div>
        </div>
        <br></br>
        <div></div>
      </div>
    </div>
  );
}

export default InventoryParent;
