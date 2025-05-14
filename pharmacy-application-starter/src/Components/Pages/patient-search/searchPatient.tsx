import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { initialPatientSearch, PatientSearch } from "./patient-search.type";
import { EndPoints, PATIENT_SEARCH_PATH, PHARMACY_HOST_NAME } from "../../common/endPoints";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { patientHeaderAction } from "../../Header/PatientHeader.actions";

const SearchPatient = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(location.pathname === PATIENT_SEARCH_PATH)

  const [patientSearch, setPatientSearch] =
    useState<PatientSearch>(initialPatientSearch);
  const [rowData, setRowData] = useState<PatientSearch[]>([]);
  const [selectedRow, setSelectedRow] = useState<PatientSearch[]>([]);

  const onChangePatient = (fieldName: string, fieldValue: string) => {
    setPatientSearch({ ...patientSearch, [fieldName]: fieldValue });
  };

  const submitSearch = () => {
    console.log(patientSearch);
    axios
      .post(
        PHARMACY_HOST_NAME + EndPoints.PATIENT_ADVANCED_SEARCH,
        patientSearch
      )
      .then((res) => {
        console.log(res);
        setRowData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const colDefs: any[] = [
    {
      width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName", width: 150 },
    { headerName: "UHID", field: "uhid", width: 140 },
    { headerName: "Phone Number", field: "phoneNumber", width: 140 },
  ];

  const clearSearch = () => {
    setSelectedRow([]);
    setRowData([]);
    setPatientSearch(initialPatientSearch);
  };

  const createPatientContext = () => {
    axios
      .get(
        PHARMACY_HOST_NAME + EndPoints.FIND_PATIENT_HEADER_BY_UHID.replace("{uhid}", `${selectedRow[0].uhid}`)
      )
      .then((res) => {
        dispatch(patientHeaderAction(res.data));
        navigate("/order");
      })
      .catch((err) => {});
  };

  return (
    <div className={ location.pathname === PATIENT_SEARCH_PATH ? "search" : ""}>
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
        <Button variant="outlined" className="m-1" onClick={clearSearch}>
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

      {rowData.length > 0 && (
        <div>
          <br></br> <br></br>
          <Card style={{ padding: "10px" }}>
            <div
              className="ag-theme-quartz"
              style={{ width: "100%", padding: 6 }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                domLayout={"autoHeight"}
                pagination={true}
                paginationPageSize={5}
                defaultColDef={{ resizable: true }}
                suppressAutoSize={true}
                onSelectionChanged={(params) => {
                  const selectedRowList: PatientSearch[] =
                    params.api.getSelectedRows();

                  setSelectedRow(selectedRowList);
                  console.log(params.api.getSelectedRows());
                }}
              />
            </div>
          </Card>
          {selectedRow.length > 0 && (
            <div style={{ display: "flex", float: "right" }}>
              <Button
                variant="contained"
                className="m-1"
                color="primary"
                onClick={createPatientContext}
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
