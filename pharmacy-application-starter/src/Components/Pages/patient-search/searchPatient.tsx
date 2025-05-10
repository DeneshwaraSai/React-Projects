import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { initialPatientSearch, PatientSearch } from "./patient-search.type";

const SearchPatient = () => {
  const [patientSearch, setPatientSearch] =
    useState<PatientSearch>(initialPatientSearch);

  const onChangePatient = (fieldName: string, fieldValue: string) => {
    setPatientSearch({ ...patientSearch, [fieldName]: fieldValue });
  };

  const submitSearch = () => {
    console.log(patientSearch);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <TextField
            label="First name"
            fullWidth
            value={patientSearch.firstName}
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
            fullWidth
            label="Last name"
            value={patientSearch.lastName}
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
          <TextField
            label="Phone Number"
            id="phone-number"
            value={patientSearch.phoneNumber}
            placeholder="Phone Number"
            fullWidth
            variant="outlined"
            className="width-280"
            inputProps={{
              maxLength: 10,
            }}
            onKeyDown={(event) => {
              const allowedKeys = Array.from({ length: 10 }, (_, i) =>
                i.toString()
              ).concat(["Backspace"]);

              if (!allowedKeys.includes(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              onChangePatient("phoneNumber", event.target.value);
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", float: "right" }}>
        <Button variant="outlined" className="m-1">
          Clear
        </Button>
        <Button
          variant="contained"
          className="m-1"
          color="primary"
          onClick={submitSearch}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SearchPatient;
