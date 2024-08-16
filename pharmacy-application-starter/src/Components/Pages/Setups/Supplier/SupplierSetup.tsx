import {
  Alert,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CodeValue } from "../../../Cache/Cache.types";
import store from "../../../Store/store";
import { Supplier } from "./Supplier.type";
import "./SupplierSetup.style.css";
import axios from "axios";
import { EndPoints, PHARMACY_HOST_NAME } from "../../../common/endPoints";
import { ErrorMessage, SnackbarType } from "../../../common/GlobalTypes";
import { useNavigate, useParams } from "react-router-dom";

function SupplierSetup() {
  const supplierInitialState: Supplier = {
    id: null,
    name: "",
    code: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    TaxNumber: "",
    licenceNumber: "",
    email: "",
    phoneNumber: "",
    status: "",
  };

  const snackbarInitialState: SnackbarType = {
    show: false,
    type: "info",
    message: "",
  };

  const errorMessageInitialState: ErrorMessage = {
    show: false,
    messageList: [],
  };

  const navigate = useNavigate();
  const params = useParams();
  const [statusCodeValue, setStatusCodeValue] = useState<CodeValue[]>([]);
  const [supplier, setSupplier] = useState<Supplier>(supplierInitialState);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    errorMessageInitialState
  );

  const [openSnackbar, setSnackbar] =
    useState<SnackbarType>(snackbarInitialState);

  useEffect(() => {
    if (params && params["id"]) {
      axios
        .get(
          PHARMACY_HOST_NAME +
            EndPoints.SUPPLIER_FIND_BY_ID.replace("{id}", params["id"])
        )
        .then((res) => setSupplier(res.data))
        .catch((err) => console.log(err));
    }

    store.getState().cacheReducer.then((res) => {
      setStatusCodeValue(res.codeValue["COMMON_STATUS"]);
    });
  }, []);

  const onChangeSupplier = (field: string, value: String | Number | null) => {
    setSupplier({
      ...supplier,
      [field]: value,
    });
  };

  const validateSupplier = () => {
    let errorMessages: string[] = [];

    if (
      supplier.name === null ||
      supplier.name === undefined ||
      supplier.name.trim().length === 0
    ) {
      errorMessages.push("The name cannot be empty");
    }
    if (
      supplier.code === null ||
      supplier.code === undefined ||
      supplier.code.trim().length === 0
    ) {
      errorMessages.push("The code cannot be empty");
    }
    if (
      supplier.status === null ||
      supplier.status === undefined ||
      supplier.status.trim().length === 0
    ) {
      errorMessages.push("The status cannot be empty");
    }

    if (errorMessages.length > 0) {
      setErrorMessage({
        show: true,
        messageList: errorMessages,
      });
      return false;
    }
    return true;
  };

  const submitSupplier = () => {
    console.log(supplier);

    setErrorMessage(errorMessageInitialState);
    setSnackbar(snackbarInitialState);
    if (validateSupplier()) {
      let uri;
      if (params["id"]) {
        uri = axios.put(
          PHARMACY_HOST_NAME + EndPoints.SUPPLIER_UPDATE,
          supplier
        );
      } else {
        uri = axios.post(
          PHARMACY_HOST_NAME + EndPoints.SUPPLIER_CREATE,
          supplier
        );
      }

      uri
        .then((res) => {
          console.log(res.data);
          setSnackbar({
            show: true,
            type: "success",
            message: "Supplier! Submitted Successfully",
          });
          backToDashboard();
        })
        .catch((err) => {
          console.log(err);
          setSnackbar({
            show: true,
            type: "error",
            message: "Error while saving.",
          });
          setErrorMessage({
            show: true,
            messageList: [err.response.data.message],
          });
        });
    }
  };

  const closeSnackBar = () => {
    setSnackbar(snackbarInitialState);
  };

  const backToDashboard = () => {
    navigate("/Setups/Supplier/Dashboard");
  };

  return (
    <div className="supplier">
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        transitionDuration={800}
        open={openSnackbar.show}
        autoHideDuration={6000}
        message={openSnackbar.message}
        onClose={closeSnackBar}
      >
        <Alert
          onClose={closeSnackBar}
          variant="filled"
          severity={openSnackbar.type}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>

      <div>
        {errorMessage.show &&
          errorMessage.messageList.map((item, index) => {
            return (
              <Alert
                style={{ marginBottom: "12px" }}
                key={index}
                variant="filled"
                severity="error"
              >
                {item}
              </Alert>
            );
          })}
      </div>

      <Card style={{ padding: "12px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                label="Name"
                value={supplier.name}
                onChange={(event) =>
                  onChangeSupplier("name", event.target.value)
                }
                placeholder="Name"
                required
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                label="Code"
                value={supplier.code}
                onChange={(event) =>
                  onChangeSupplier("code", event.target.value)
                }
                placeholder="Code"
                required
              />
            </div>

            <div className="col">
              <TextField
                value={supplier.accountNumber}
                onChange={(event) =>
                  onChangeSupplier("accountNumber", event.target.value)
                }
                fullWidth
                label="Acccount Number"
                placeholder="Acccount Number"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                value={supplier.accountHolderName}
                onChange={(event) =>
                  onChangeSupplier("accountHolderName", event.target.value)
                }
                label="Account Holder name"
                placeholder="Account Holder name"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                label="IFSC Code"
                value={supplier.ifscCode}
                onChange={(event) =>
                  onChangeSupplier("ifscCode", event.target.value)
                }
                placeholder="IFSC Code"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                label="Tax Number"
                placeholder="Tax Number"
                value={supplier.TaxNumber}
                onChange={(event) =>
                  onChangeSupplier("TaxNumber", event.target.value)
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                value={supplier.licenceNumber}
                label="Licence Number"
                placeholder="Licence Number"
                onChange={(event) =>
                  onChangeSupplier("licenceNumber", event.target.value)
                }
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                label="Email"
                value={supplier.email}
                onChange={(event) =>
                  onChangeSupplier("email", event.target.value)
                }
                placeholder="Email"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                label="Contact Number"
                inputProps={{ maxLength: 10 }}
                value={supplier.phoneNumber}
                onChange={(event) =>
                  onChangeSupplier("phoneNumber", event.target.value)
                }
                placeholder="Contact Number"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <FormControl fullWidth required>
                <InputLabel id="status"> Status </InputLabel>
                <Select
                  labelId="status"
                  label="Status"
                  fullWidth
                  value={supplier.status}
                  onChange={(event) =>
                    onChangeSupplier("status", event.target.value)
                  }
                  placeholder="Status"
                  required
                >
                  {statusCodeValue &&
                    statusCodeValue.map((item, index) => {
                      return (
                        <MenuItem key={index} value={String(item.code)}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", float: "right" }}>
            <div className="button-padding">
              <Button variant="text" onClick={() => backToDashboard()}>
                Cancel
              </Button>
            </div>
            <div className="button-padding">
              <Button variant="contained" onClick={() => submitSupplier()}>
                {params["id"] ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SupplierSetup;
