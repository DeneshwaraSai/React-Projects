import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  IconButton,
  Modal,
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
import { InventoryItems, InventoryModal } from "./Inventory.type";
import {
  inventoryChildInitialState,
  TableHeaders,
} from "./Inventory.initialState";

function InventoryChild() {
  const initialInventoryModal: InventoryModal = {
    isOpen: false,
    deleteIndex: null,
  };
  const [searchedDrugs, setSearchedDrugs] = useState<DrugInfo[]>([]);
  const [inventoryModal, setInventoryModal] = useState<InventoryModal>(initialInventoryModal  );
  const [dataSource, setDataSource] = useState<InventoryItems[]>([
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

  const deleteRecord = async (index: number) => {
    if (dataSource[index].drugName) {
      setInventoryModal({
        isOpen: true,
        deleteIndex: index,
      });
    } else {
      setDataSource((prevState) => {
        const previousState = [...prevState];
        const state = previousState.filter(
          (item, i) => i != inventoryModal.deleteIndex
        );
        return state;
      });
    }
  };

  const closeInvModel = () => {
    setInventoryModal(initialInventoryModal);
  };

  const deleteByIndex = () => {
    setDataSource((prevState) => {
      const previousState = [...prevState];
      const state = previousState.filter(
        (item, i) => i != inventoryModal.deleteIndex
      );
      return state;
    });

    closeInvModel();
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
        drugCode: String(option.id),
        cgst: Number(option.cgst),
        sgst: Number(option.sgst),
        hsnCode: String(option.hsnCode),
      };
      return updatedDataSource;
    });
  };

  const onSubmit = () => {
    console.log(dataSource);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        key="deleteModal"
        open={inventoryModal.isOpen}
        onClose={() => closeInvModel()}
      >
        <Box key="Box-modal" sx={style}>
          <h4>Do you want to delete ________ ?</h4>
          <br></br>
          <div style={{ display: "flex", float: "right" }}>
            <Button
              variant="outlined"
              style={{ marginRight: 4 }}
              onClick={() => closeInvModel()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteByIndex()}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      <Card>
        <div style={{ float: "right", margin: "11px 6px 12px 0px" }}>
          <Button variant="contained" onClick={() => add()}>
            Add
          </Button>
        </div>

        <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
          <Table>
            <TableHead style={{ height: 20, padding: 0, margin: 0 }}>
              <TableRow
                key="headKey1"
                style={{ height: 20, padding: 0, margin: 0 }}
              >
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
                          type="number"
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
                          type="number"
                          size="small"
                          style={{ width: "90px" }}
                          className="text-field"
                          fullWidth
                          value={item.quantity}
                          name="quantity"
                          placeholder="Quantity"
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
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
                            value={item.hsnCode}
                            name="hsnCode"
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
                          type="number"
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Manufacturer Rate"
                          name="manufacturerRate"
                          value={item.manufacturerRate}
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="number"
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Total Manufacturer Rate"
                          name="totalManufacturerRate"
                          value={item.totalManufacturerRate}
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
                          type="number"
                          placeholder="Net Amount"
                          name="netAmount"
                          value={item.netAmount}
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="number"
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Selling Cost"
                          value={item.sellingCost}
                          name="sellingCost"
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
                        />
                      </TableCell>

                      <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                        <TextField
                          type="number"
                          size="small"
                          style={{ width: "140px" }}
                          className="text-field"
                          fullWidth
                          placeholder="Total Selling Cost"
                          value={item.totalSellingCost}
                          name="totalSellingCost"
                          onChange={(e) =>
                            setDrugItem(index, e.target.name, e.target.value)
                          }
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
    </div>
  );
}

export default InventoryChild;
