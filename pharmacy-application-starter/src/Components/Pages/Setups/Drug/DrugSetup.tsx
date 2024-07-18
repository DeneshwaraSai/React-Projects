import { Button, Card, TextField } from "@mui/material";
import "./DrugSetup.style.css";
import React, { useState } from "react";
import { DrugInfo } from "./DrugInfo.type";
import axios from "axios";
import { PHARMACY_HOST_NAME } from "../../../common/endPoints";
import store from "../../../Store/store";
import { TaxCategory } from "../../../Cache/Cache.types";

function DrugSetup() {
  const initialState: DrugInfo = {
    id: null,
    name: "",
    type: null,
    category: null,
    unitsPerPack: null,
    hsnCode: null,
    cgst: null,
    igst: null,
    sgst: null,
    status: null,
    composition: null,
    genericName: null,
  };

  const [drugInfo, setDruginfo] = useState(initialState);

  const onChangeInput = (field: string, value: string) => {
    setDruginfo({
      ...drugInfo,
      [field]: value,
    });
  };

  // const taxCategory: TaxCategory[] = store
  //   .getState()
  //   .cacheReducer.then((res) => {
  //     console.log(res);
  //     return res.taxCategory;
  //   });

  const onDrugInfoSubmit = () => {
    console.log(drugInfo);
  };

  const getTaxCategory = () => {
    // axios
    //   .get(PHARMACY_HOST_NAME + "/taxCategory/list")
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  };

  getTaxCategory();

  return (
    <div className="drug">
      <h2> Drug Setup </h2>

      <Card variant="outlined" style={{ padding: "14px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                placeholder="Drug Name"
                onChange={(event) => onChangeInput("name", event.target.value)}
                label="Drug Name"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                placeholder="Drug Type"
                label="Drug Type"
                onChange={(event) => onChangeInput("type", event.target.value)}
              />
            </div>

            <div className="col">
              <TextField fullWidth placeholder="Category" label="Category" />
            </div>

            <div className="col">
              <TextField
                fullWidth
                placeholder="units per pack"
                label="units per pack"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField fullWidth placeholder="HSN Code" label="HSN Code" />
            </div>

            <div className="col">
              <TextField fullWidth placeholder="CGST" label="CGST" />
            </div>

            <div className="col">
              <TextField fullWidth placeholder="IGST" label="IGST" />
            </div>

            <div className="col">
              <TextField fullWidth placeholder="SGST" label="SGST" />{" "}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField placeholder="Status" fullWidth label="Status" />
            </div>

            <div className="col">
              <TextField
                fullWidth
                placeholder="Drug Composition"
                label="Drug Composition"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                placeholder="Drug Generic Name"
                label="Drug Generic Name"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="button-style">
            <div className="button-padding">
              <Button variant="outlined"> Cancel </Button>
            </div>
            <div className="button-padding">
              <Button variant="contained" onClick={() => onDrugInfoSubmit()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DrugSetup;
