import React, { useState } from "react";
import InventoryParent from "./InventoryParent";
import Tooltip from "@mui/material/Tooltip";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import { Inventory, InventoryItems, InventoryModal } from "./Inventory.type";
import {
  initialInventoryModal,
  inventoryChildInitialState,
  inventoryInitialState,
  TableHeaders,
} from "./Inventory.initialState";
import {
  Alert,
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
import { DrugInfo } from "../Setups/Drug/DrugInfo.type";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import axios from "axios";
import { StringSupport } from "../../common/StringSupport";

function InventoryDetails() {
  const [errorMessage, setErrorMessage] = useState<String[]>([]);
  const [inventory, setInventory] = useState<Inventory>(inventoryInitialState);
  const [searchedDrugs, setSearchedDrugs] = useState<DrugInfo[]>([]);
  const [dataSource, setDataSource] = useState<InventoryItems[]>([
    inventoryChildInitialState,
    inventoryChildInitialState,
  ]);
  const [inventoryModal, setInventoryModal] = useState<InventoryModal>(
    initialInventoryModal
  );

  const updateFields = (fieldName: string, fieldValue: any) => {
    setInventory({ ...inventory, [fieldName]: fieldValue });
  };

  const validateInventory = (): boolean => {
    console.log(inventory);
    console.log(dataSource);
    const errors: String[] = [];

    if (StringSupport.isBlank(inventory.supplierCode)) {
      errors.push("Supplier name cannot be empty.");
    }
    if (StringSupport.isBlank(inventory.invoiceNumber)) {
      errors.push("Invoice number cannot be empty.");
    }
    if (inventory.invoiceDate === null || inventory.invoiceDate === undefined) {
      errors.push("Invoice date cannot be empty.");
    }

    const inventoryDetails: InventoryItems[] = dataSource.filter((item) => {
      if (!StringSupport.isBlank(item.drugName)) return item;
    });
    console.log(inventoryDetails);

    inventoryDetails.forEach((items, index) => {
      if (StringSupport.isBlank(items.batchNumber)) {
        errors.push(
          `Batch number cannot be empty for drugname ${items.drugName}.`
        );
      }
      if (items.expiryDate === null || items.expiryDate === undefined) {
        errors.push(
          `Expiry date cannot be empty for drugname ${items.drugName}.`
        );
      }
      if (items.expiryDate && items.expiryDate < new Date()) {
        errors.push(
          `Expiry date cannot be in the past for drugname ${items.drugName}.`
        );
      }
      if (items.stripSize.valueOf() <= 0) {
        errors.push(
          `Strip size must be greater than zero for drugname ${items.drugName}.`
        );
      }
      if (items.quantity.valueOf() <= 0) {
        errors.push(
          `Quantity must be greater than zero for drugname ${items.drugName}.`
        );
      }
      if (items.manufacturerRate.valueOf() <= 0) {
        errors.push(
          `Manufacturer rate must be greater than zero for drugname ${items.drugName}.`
        );
      }
      if (items.sellingCost.valueOf() <= 0) {
        errors.push(
          `Selling cost must be greater than zero for drugname ${items.drugName}.`
        );
      }
    });

    setErrorMessage(errors);

    return errors.length > 0 ? false : true;
  };

  const onSubmit = () => {
    validateInventory();

    console.log(inventory);
    console.log(dataSource);
  };

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
        const state = previousState.filter((item, i) => i !== index);
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
        (item, i) => i !== inventoryModal.deleteIndex
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

  const calculateNetAmt = (
    index: number,
    fieldName: string,
    fieldValue: string
  ) => {
    const manufacturerRate = Number(fieldValue);
    const totalManufacturerRate =
      manufacturerRate * Number(dataSource[index].quantity);
    const cgstAmt = parseFloat(
      String((totalManufacturerRate * Number(dataSource[index].cgst)) / 100)
    ).toFixed(2);
    const sgstAmt = parseFloat(
      String((totalManufacturerRate * Number(dataSource[index].sgst)) / 100)
    ).toFixed(2);
    const invoiceAmt = parseFloat(
      String(totalManufacturerRate + Number(cgstAmt) + Number(sgstAmt))
    ).toFixed(2);

    setDataSource((prevState) => {
      const state = [...prevState];
      state[index] = {
        ...state[index],
        [fieldName]: manufacturerRate,
        totalManufacturerRate: totalManufacturerRate,
        netAmount: totalManufacturerRate,
        invoiceAmount: Number(invoiceAmt),
      };
      return state;
    });
  };

  const calculateByQty = (
    index: number,
    fieldName: string,
    fieldValue: string
  ) => {
    const qty = Number(fieldValue);
    const manufacturerRate = Number(dataSource[index].manufacturerRate);
    const totalManufacturerRate = manufacturerRate * Number(qty);
    const cgstAmt = parseFloat(
      String((totalManufacturerRate * Number(dataSource[index].cgst)) / 100)
    ).toFixed(2);
    const sgstAmt = parseFloat(
      String((totalManufacturerRate * Number(dataSource[index].sgst)) / 100)
    ).toFixed(2);
    const invoiceAmt = parseFloat(
      String(totalManufacturerRate + Number(cgstAmt) + Number(sgstAmt))
    ).toFixed(2);

    const sellingCost = Number(dataSource[index].sellingCost);
    const totalSellingCost = parseFloat(
      String(Number(sellingCost) * qty)
    ).toFixed(2);

    setDataSource((prevState) => {
      const state = [...prevState];
      state[index] = {
        ...state[index],
        [fieldName]: qty,
        totalManufacturerRate: totalManufacturerRate,
        netAmount: totalManufacturerRate,
        invoiceAmount: Number(invoiceAmt),
        totalSellingCost: Number(totalSellingCost),
      };
      return state;
    });
  };

  const setDrugItemBySellingCost = (
    index: number,
    fieldName: string,
    fieldValue: string
  ) => {
    const totalSellingCost = parseFloat(
      String(Number(dataSource[index].quantity) * Number(fieldValue))
    ).toFixed(2);
    setDataSource((prevState) => {
      const state = [...prevState];
      state[index] = {
        ...state[index],
        [fieldName]: Number(fieldValue),
        totalSellingCost: Number(totalSellingCost),
      };
      return state;
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
    <div className="inventory">
      {errorMessage.map((message) => {
        return (
          <Alert
            style={{ marginBottom: 6 }}
            onClose={() => {}}
            severity="error"
          >
            {" "}
            {message}{" "}
          </Alert>
        );
      })}
      <InventoryParent inventory={inventory} setInventory={updateFields} />

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
                            disablePortal
                            id="combo-box-demo"
                            getOptionLabel={(option) => String(option.name)}
                            options={searchedDrugs}
                            onChange={(event, option) => {
                              // console.log(option);
                              setDrugInfo(index, option as DrugInfo);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "200px" }}
                                fullWidth
                                placeholder="Drug Name"
                                label="Drug Name"
                                onChange={(e) => drugDropDown(e.target.value)}
                              />
                            )}
                          />

                          {/* <Autocomplete
                            disableCloseOnSelect
                            // getOptionLabel={(option) => String(option.name)}
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
                          ></Autocomplete> */}
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
                              calculateByQty(
                                index,
                                e.target.name,
                                e.target.value
                              )
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
                              disabled={true}
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
                              calculateNetAmt(
                                index,
                                e.target.name,
                                e.target.value
                              )
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
                            disabled={true}
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
                            disabled={true}
                          />
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #A9A9A9" }}>
                          <TextField
                            size="small"
                            style={{ width: "140px" }}
                            className="text-field"
                            fullWidth
                            type="number"
                            placeholder="Invoice Amount"
                            name="invoiceAmount"
                            value={item.invoiceAmount}
                            onChange={(e) =>
                              setDrugItem(index, e.target.name, e.target.value)
                            }
                            disabled={true}
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
                              setDrugItemBySellingCost(
                                index,
                                e.target.name,
                                e.target.value
                              )
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
                            disabled={true}
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

      <br></br>
      <div style={{ display: "flex", float: "right", marginBottom: 12 }}>
        <div style={{ marginRight: 6 }}>
          <Button variant="outlined"> cancel </Button>
        </div>
        <div style={{ marginLeft: 6 }}>
          <Button variant="contained" onClick={() => onSubmit()}>
            submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InventoryDetails;
