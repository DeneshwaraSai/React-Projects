import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import {
  Autocomplete,
  Button,
  Card, 
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "./InventoryChild.style.css";
import { DrugInfo } from "../Setups/Drug/DrugInfo.type";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import { InventoryDetails } from "./Inventory.type";
import {
  inventoryChildInitialState,
  TableHeaders,
} from "./Inventory.initialState";

function InventoryChild() {
  const [searchedDrugs, setSearchedDrugs] = useState<DrugInfo[]>([]);

  const [dataSource, setDataSource] = useState<InventoryDetails[]>([
    inventoryChildInitialState,
    inventoryChildInitialState,
  ]);

  useEffect(() => {});

  const drugDropDown = (name: string) => {
    if (name && name.length >= 3) {
      axios
        .get(PHARMACY_HOST_NAME + EndPoints.DRUG_LIST_BY_NAME, {
          params: {
            name: name,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data && res.data.length === 0) {
            setSearchedDrugs([]);
          } else {
            setSearchedDrugs(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchedDrugs([]);
    }
  };

  const add = () => {
    setDataSource([...dataSource, inventoryChildInitialState]);
  };

  const deleteRecord = (index: number) => {
    setDataSource((prevState) => {
      const newState = [...prevState];
      const state = newState.filter((item, i) => i != index);
      return state;
    });
  };

  const setDrugItem = (
    index: number,
    fieldName: string,
    fieldValue: string
  ) => {
    setDataSource((prevState) => {
      const oldState = [...prevState];
      oldState[index] = {
        ...oldState[index],
        [fieldName]: fieldValue,
      };
      return oldState;
    });
  };

  const setDrugInfo = (index: number, option: DrugInfo) => {
    setDataSource((prevState) => {
      const updatedDataSource = [...prevState];
      updatedDataSource[index] = {
        ...updatedDataSource[index],
        drugName: String(option.name),
        drugCode: Number(option.id),
        cgst: Number(option.cgst),
        sgst: Number(option.sgst),
        hsnCode: String(option.hsnCode),
      };
      return updatedDataSource;
    });
  };

  return (
    <div>
      <Card>
        <Button onClick={() => add()}> Add </Button>
        <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
          <Table>
            <TableHead style={{ height: 20, padding: 0, margin: 0 }}>
              <TableRow style={{ height: 20, padding: 0, margin: 0 }}>
                {TableHeaders.map((item, index) => {
                  return (
                    <TableCell
                      sx={{ border: "1px solid #A9A9A9", fontWeight: "bold" }}
                    >
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {dataSource.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <TableRow
                      style={{ height: 20, padding: 0, margin: 0 }}
                      key={index}
                    >
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <Autocomplete
                          disableCloseOnSelect
                          getOptionLabel={(option) => String(option.name)}
                          options={searchedDrugs}
                          onChange={(event, option) => {
                            setDrugInfo(index, option as DrugInfo);
                          }}
                          renderInput={(params) => {
                            return (
                              <TextField
                                {...params}
                                style={{ width: "200px" }}
                                className="text-field"
                                fullWidth
                                placeholder="Drug Name"
                                label="Drug Name"
                                onChange={(e) => drugDropDown(e.target.value)}
                              />
                            );
                          }}
                        ></Autocomplete>
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          name="batchNumber"
                          value={item.batchNumber}
                          placeholder="Batch Number"
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: {
                              pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                            },
                          }}
                          placeholder="Expiry Date"
                          name="expiryDate"
                          value={item.expiryDate}
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "100px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Strip Size"
                          name="stripSize"
                          value={item.stripSize}
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "90px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Quantity"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <div style={{ display: "flex" }}>
                          <TextField
                            size="small"
                            style={{ width: "110px" }}
                            className="text-field"
                            fullWidth
                            placeholder="HSN Code"
                          />
                          <Tooltip
                            title={
                              <div>
                                <p style={{ padding: 0, margin: 0 }}>
                                  id : {item.drugCode}
                                </p>
                                <p style={{ padding: 0, margin: 0 }}>
                                  sgst %: {item.sgst}
                                </p>
                                <p style={{ padding: 0, margin: 0 }}>
                                  cgst %: {item.cgst}
                                </p>
                              </div>
                            }
                          >
                            <IconButton>
                              <BsIcons.BsInfoCircle></BsIcons.BsInfoCircle>
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Manufacturer Rate"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Total Manufacturer Rate"
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          type="number"
                          placeholder="Net Amount"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Selling Cost"
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Total Selling Cost"
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <IconButton onClick={() => deleteRecord(index)}>
                          <MdIcons.MdDelete
                            color="error"
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
    </div>
  );
}

export default InventoryChild;
