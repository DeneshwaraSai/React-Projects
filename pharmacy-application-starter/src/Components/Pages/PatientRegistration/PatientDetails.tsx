import React, { useEffect, useState } from "react";
import "./patient.style.css";
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
import { gender } from "./patient.constants";
import { Patient } from "./patient.type";
import axios from "axios";
import { EndPoints } from "../../common/endPoints";
import { ErrorMessage, SnackbarType } from "../../common/GlobalTypes";

function PatientDetails() {
  const snackbarInitialState: SnackbarType = {
    show: false,
    type: "info",
    message: "",
  };

  const patientInitialState: Patient = {
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
    ageType: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    email: "",
  };

  const errorMessageInitialState: ErrorMessage = {
    show: false,
    messageList: [],
  };

  const [openSnackbar, setSnackbar] =
    useState<SnackbarType>(snackbarInitialState);

  const [patient, setPatient] = useState<Patient>(patientInitialState);

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    errorMessageInitialState
  );

  useEffect(() => {
    axios
      .get("http://localhost:8080/patient/list")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  const onChangePatient = (field: string, value: String | string | null) => {
    setPatient({
      ...patient,
      [field]: value,
    });
    console.log(patient);
  };

  const validatePatient = () => {
    let errorMessages: string[] = [];

    if (
      patient.firstName === null ||
      patient.firstName === undefined ||
      patient.firstName.trim().length === 0
    ) {
      errorMessages.push("The first name cannot be empty");
    }

    if (
      patient.lastName === null ||
      patient.lastName === undefined ||
      patient.lastName.trim().length === 0
    ) {
      errorMessages.push("The last name cannot be empty");
    }

    if (
      patient.email === null ||
      patient.email === undefined ||
      patient.email.trim().length === 0
    ) {
      errorMessages.push("The email cannot be empty");
    }

    if (
      patient.phoneNumber === null ||
      patient.phoneNumber === undefined ||
      patient.phoneNumber.trim().length === 0
    ) {
      errorMessages.push("The phoneNumber cannot be empty");
    }

    if (
      patient.gender === null ||
      patient.gender === undefined ||
      patient.gender.trim().length === 0
    ) {
      errorMessages.push("The gender cannot be empty");
    }

    if (patient.dateOfBirth === null || patient.dateOfBirth === undefined) {
      errorMessages.push("The dateOfBirth cannot be empty");
    }

    if (errorMessages.length > 0) {
      setErrorMessage({
        show: true,
        messageList: errorMessages,
      });
      return false;
    } else {
      return true;
    }
  };

  const submitPatient = () => {
    setErrorMessage(errorMessageInitialState);

    console.log(patient);
    console.log(validatePatient());

    if (validatePatient() === true) {
      axios
        .post("http://localhost:8080" + EndPoints.PATIENT_SAVE, patient)
        .then((response) => {
          console.log(response);

          setSnackbar({
            show: true,
            type: "success",
            message: "Patient saved successfully.",
          });

          // create context
        })
        .catch((error) => {
          console.log(error);
          setSnackbar({
            show: true,
            type: "error",
            message: "Error!",
          });
        });
    }
  };

  const closeSnackBar = () => {
    setSnackbar({
      ...openSnackbar,
      show: false,
    });
  };

  const alertClose = (index: number) => {
    const message = errorMessage.messageList.filter(
      (message, i) => i !== index
    );
    setErrorMessage({
      ...errorMessage,
      messageList: message,
    });
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transitionDuration={800}
          open={openSnackbar.show}
          autoHideDuration={4000}
          onClose={closeSnackBar}
        >
          <Alert
            onClose={closeSnackBar}
            variant="filled"
            severity={openSnackbar.type}
          >
            Patient saved successfully.
          </Alert>
        </Snackbar>
      </div>

      {/* <PatientHeader patientHeader={patientHeader} /> */}

      {errorMessage.show &&
        errorMessage.messageList.map((message: string, index: number) => {
          return (
            <div>
              <Alert
                variant="filled"
                severity="error"
                onClose={() => alertClose(index)}
                className="alert-error"
              >
                {message}
              </Alert>
            </div>
          );
        })}

      <h2> Patient Details </h2>
      <Card variant="outlined" className="mat-card">
        <div className="container">
          <div className="row">
            <div className="col">
              <TextField
                label="First name"
                value={patient.firstName}
                id="first-name"
                placeholder="First name"
                variant="outlined"
                className="width-280"
                inputProps={{
                  required: true,
                }}
                onChange={(event) =>
                  onChangePatient("firstName", event.target.value)
                }
              />
            </div>

            <div className="col">
              <TextField
                label="Last name"
                value={patient.lastName}
                id="last-name"
                variant="outlined"
                placeholder="last Name"
                className="width-280"
                inputProps={{
                  required: true,
                }}
                onChange={(event) =>
                  onChangePatient("lastName", event.target.value)
                }
              />
            </div>

            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="gender"> Gender </InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  label="Gender"
                  placeholder="Gender"
                  className="width-280"
                  variant="outlined"
                  value={patient.gender}
                  inputProps={{
                    required: true,
                  }}
                  // onChange={onChangePatient("gender")}
                  onChange={(event) =>
                    onChangePatient("gender", event.target.value)
                  }
                >
                  {gender.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.code}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <TextField
                label="Phone Number"
                id="phone-number"
                type="number"
                value={patient.phoneNumber}
                placeholder="Phone Number"
                variant="outlined"
                className="width-280"
                inputProps={{
                  required: true,
                }}
                onChange={(event) =>
                  onChangePatient("phoneNumber", event.target.value)
                }
              />
            </div>

            <div className="col">
              <TextField
                type="date"
                label="Date of Birth"
                id="dob"
                variant="outlined"
                className="width-280"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: "9999-12-31",
                    pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
                  },
                }}
                value={patient.dateOfBirth}
                onChange={(event) =>
                  onChangePatient("dateOfBirth", event.target.value)
                }
              />
            </div>

            <div className="col">
              <TextField
                label="Email"
                value={patient.email}
                id="Email"
                variant="outlined"
                placeholder="john@gmail.com"
                className="width-280"
                inputProps={{
                  required: true,
                }}
                onChange={(event) =>
                  onChangePatient("email", event.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="button">
          <div className="button-align">
            <Button variant="outlined">Cancel</Button>
          </div>
          <div className="button-align">
            <Button
              variant="contained"
              onClick={() => submitPatient()}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>

      <br></br>
    </div>
  );
}

export default PatientDetails;
