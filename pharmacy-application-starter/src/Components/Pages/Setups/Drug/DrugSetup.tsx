import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./DrugSetup.style.css";
import React, { useEffect, useState } from "react";
import { DrugInfo } from "./DrugInfo.type";
import store from "../../../Store/store";
import { CodeValue, TaxCategory } from "../../../Cache/Cache.types";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../../common/endPoints";
import { useNavigate, useParams } from "react-router-dom";
import { drugInfoInitialState } from "./Drug.initialState";

function DrugSetup() {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();
  const [taxCategory, setTaxCategory] = useState<TaxCategory[]>([]);
  const [drugTypeCodeValue, setDrugTypeCodeValue] = useState<CodeValue[]>([]);
  const [statusCodeValue, setStatusCodeValue] = useState<CodeValue[]>([]);

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        if (res && res.taxCategory) {
          setTaxCategory(res.taxCategory);
        } else {
          setTaxCategory([]);
        }

        if (res && res.codeValue) {
          setDrugTypeCodeValue(res.codeValue["DRUG_TYPE"]);
          setStatusCodeValue(res.codeValue["DRUG_STATUS"]);
        }
      })
      .catch((err) => err);

    if (params["id"]) {
      axios
        .get(
          PHARMACY_HOST_NAME +
            EndPoints.FIND_DRUG_BY_ID.replace("{id}", params["id"])
        )
        .then((res) => {
          setDruginfo(res.data);
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, []);

  const [drugInfo, setDruginfo] = useState(drugInfoInitialState);

  const onChangeInput = (field: string, value: any) => {
    console.log(field, value);
    setDruginfo({
      ...drugInfo,
      [field]: value,
    });
  };

  const setTaxCategoryAndTaxes = (item: TaxCategory) => {
    setDruginfo({
      ...drugInfo,
      hsnCode: item.code,
      cgst: item.cgst,
      sgst: item.sgst,
      igst: item.igst,
    });
  };

  const onDrugInfoSubmit = () => {
    console.log(drugInfo);
    let url;
    if (params["id"]) {
      url = axios.put(PHARMACY_HOST_NAME + EndPoints.UPDATE_DRUG, drugInfo);
    } else {
      url = axios.post(PHARMACY_HOST_NAME + EndPoints.SAVE_DRUG, drugInfo);
    }

    url
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onTaxCategoryChange = async (value: any) => {
    console.log(value);
    if (taxCategory) {
      for (const item of taxCategory) {
        if (item.code?.toString() === value.toString()) {
          setTaxCategoryAndTaxes(item);
          break;
        }
      }
    }
  };

  const backToDashboard = () => {
    navigate("/Setups/Drug/Dashboard");
  };

  return (
    <div className="drug">
      <h2> Drug Setup </h2>
      <Card variant="outlined" style={{ padding: "12px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                value={drugInfo.name}
                placeholder="Drug Name"
                onChange={(event) => onChangeInput("name", event.target.value)}
                label="Drug Name"
              />
            </div>

            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="Drug-Type"> Drug Type </InputLabel>
                <Select
                  variant="outlined"
                  fullWidth
                  placeholder="Drug Type"
                  label="Drug Type"
                  value={drugInfo.type}
                  onChange={(event) =>
                    onChangeInput("type", event.target.value)
                  }
                >
                  {drugTypeCodeValue.map((item: CodeValue, index: number) => {
                    return (
                      <MenuItem key={index} value={item.code + ""}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="col">
              <TextField
                type="number"
                fullWidth
                value={drugInfo.unitsPerPack}
                placeholder="units per pack"
                label="units per pack"
                onChange={(event) =>
                  onChangeInput("unitsPerPack", event.target.value)
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="taxCategory"> Tax Category </InputLabel>
                <Select
                  placeholder="HSNCODE"
                  fullWidth
                  label="taxCategory"
                  id="taxCategory"
                  labelId="taxCategory"
                  value={drugInfo.hsnCode}
                  onChange={(e) => onTaxCategoryChange(e.target.value)}
                  variant="outlined"
                >
                  {taxCategory.length > 0 &&
                    taxCategory.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code + ""}>
                          {item.code}
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
                value={drugInfo.cgst}
                placeholder="CGST"
                label="CGST"
                inputProps={{
                  readOnly: true,
                }}
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                type="number"
                value={drugInfo.igst}
                placeholder="IGST"
                label="IGST"
                inputProps={{
                  readOnly: true,
                }}
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                type="number"
                placeholder="SGST"
                value={drugInfo.sgst}
                label="SGST"
                inputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              {/* <TextField
                value={drugInfo.status}
                placeholder="Status"
                fullWidth
                label="Status"
                inputProps={{
                  readOnly: true,
                }}
              /> */}

              <FormControl fullWidth>
                <InputLabel> Status </InputLabel>
                <Select
                  variant="outlined"
                  value={drugInfo.status}
                  placeholder="Status"
                  fullWidth
                  label="Status"
                  onChange={(event) =>
                    onChangeInput("status", event.target.value)
                  }
                >
                  {statusCodeValue.length > 0 &&
                    statusCodeValue.map((item, index) => {
                      return (
                        <MenuItem value={item.code + ""} key={index}>
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
                value={drugInfo.composition}
                placeholder="Drug Composition"
                label="Drug Composition"
                onChange={(event) =>
                  onChangeInput("composition", event.target.value)
                }
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                value={drugInfo.genericName}
                placeholder="Generic Name"
                label="Generic Name"
                onChange={(event) =>
                  onChangeInput("genericName", event.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className="button-style">
            <div className="button-padding">
              <Button variant="outlined" onClick={() => backToDashboard()}>
                Cancel
              </Button>
            </div>
            <div className="button-padding">
              <Button variant="contained" onClick={() => onDrugInfoSubmit()}>
                {params["id"] ? "update" : "submit"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DrugSetup;
