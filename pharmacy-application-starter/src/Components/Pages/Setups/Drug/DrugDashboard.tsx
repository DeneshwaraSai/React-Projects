import {
  Button,
  Card,
} from "@mui/material";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { CodeValue } from "../../../Cache/Cache.types";
import { EndPoints, PHARMACY_HOST_NAME } from "../../../common/endPoints";
import "./DrugDashboard.style.css";
import { DrugInfo } from "./DrugInfo.type";
import store from "../../../Store/store";
import { AgGridReact } from "ag-grid-react";

function DrugDashboard() {
  const navigate = useNavigate();
  const [typeCodeValue, setTypeCodeValue] = useState<CodeValue[]>([]);
  const [statusCodeValue, setStatusCodeValue] = useState<CodeValue[]>([]);
  const [drugList, setDrugList] = useState<DrugInfo[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<DrugInfo[]>([]);
  const goToCreate = () => {
    navigate("/Setups/Drug/create");
  };

  const goToUpdate = () => {
    navigate("/Setups/Drug/create");
  };

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        if (res && res.codeValue) {
          setTypeCodeValue(res.codeValue["DRUG_TYPE"]);
          setStatusCodeValue(res.codeValue["DRUG_STATUS"]);

          axios(PHARMACY_HOST_NAME + EndPoints.DRUG_LIST)
            .then((res) => {
              setDrugList(res.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const goBack = () => {
    navigate("/Setups");
  };

  const getTypeByCode = (code: String) => {
    const codeValue = typeCodeValue?.find((item) => item.code === code);
    return codeValue ? codeValue.value : code;
  };

  const getStatusByCode = (code: string) => {
    const codeValue = statusCodeValue?.find((item) => item.code === code);
    return codeValue ? codeValue.value : code;
  };

  const updateSelectedNode = () => {
    navigate(`/Setups/Drug/update/${selectedData[0].id}`);
  };

  const columnDefs: any[] = [
    {
      width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "type",
      headerName: "Type",
      valueGetter: (params: any) => {
        return getTypeByCode(params.data.type);
      },
    },
    {
      field: "hsnCode",
      headerName: "HSN Code",
    },
    {
      field: "cgst",
      headerName: "CGST %",
    },
    {
      field: "sgst",
      headerName: "SGST %",
    },
    {
      field: "genericName",
      headerName: "Generic Name",
    },
    {
      field: "status",
      headerName: "Status",
      valueGetter: (params: any) => {
        return getStatusByCode(params.data.status);
      },
    },
  ];

  const gridOptions = {
    columnDefs: columnDefs,
    checkboxSelection: true,
    onFirstDataRendered: (params: any) => {
      params.api.sizeColumnsToFit();
    },
    onGridReady: (params: any) => {
      setGridApi(params.api);
    },
    onSelectionChanged: (params: any) => {
      const selectedRows = params.api.getSelectedRows();
      setSelectedData(selectedRows);
    },
  };

  return (
    <div className="drug">
      <div>
        <div style={{ display: "flex", float: "left" }}>
          <Button
            variant="outlined"
            onClick={() => goBack()}
            startIcon={<IoIcons.IoIosArrowRoundBack />}
          >
            Back
          </Button>
        </div>

        <div style={{ display: "flex", float: "right" }}>
          <div className="adjust-button">
            <Button
              startIcon={<IoIcons.IoMdAddCircle />}
              variant="contained"
              onClick={() => goToUpdate()}
            >
              Create
            </Button>
          </div>

          <div className="adjust-button">
            <Button
              variant="contained"
              onClick={() => updateSelectedNode()}
              startIcon={<FaIcons.FaEdit />}
            >
              Update
            </Button>
          </div>

          <div className="adjust-button">
            <Button
              variant="outlined"
              startIcon={<MdIcons.MdDelete />}
              color="error"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      <Card style={{ padding: "10px" }}>
        <div className="ag-theme-quartz" style={{ width: "100%", padding: 6 }}>
          <AgGridReact
            rowData={drugList}
            columnDefs={columnDefs}
            domLayout={"autoHeight"}
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{ resizable: true }}
            suppressAutoSize={true}
          />
        </div>
      </Card>
    </div>
  );
}

export default DrugDashboard;
