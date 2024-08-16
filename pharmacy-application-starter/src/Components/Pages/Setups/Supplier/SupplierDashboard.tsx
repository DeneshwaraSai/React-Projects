import { Button, Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { EndPoints, PHARMACY_HOST_NAME } from "../../../common/endPoints";
import { Supplier } from "./Supplier.type";
import { AgGridReact } from "ag-grid-react";
import { CodeValue } from "../../../Cache/Cache.types";
import store from "../../../Store/store";

function SupplierDashboard() {
  const navigate = useNavigate();

  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [supplierStatusCodeValue, setSupplierStatusCodeValue] = useState<
    CodeValue[]
  >([]);

  const [gridApi, setGridApi] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<Supplier[]>([]);

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        setSupplierStatusCodeValue(res.codeValue["COMMON_STATUS"]);
      })
      .catch((err) => console.log(err));

    axios
      .get(PHARMACY_HOST_NAME + EndPoints.SUPPLIER_LIST)
      .then((res) => setSupplierList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const goBack = () => {
    navigate("/Setups");
  };

  const goToCreate = () => {
    navigate("/Setups/Supplier/create");
  };

  const goToUpdate = () => {
    console.log(selectedData);
    navigate(`/Setups/Supplier/update/${selectedData[0].id}`);
  };

  const columnDefs: any[] = [
    {
      width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: "name",
      fieldValue: "Name",
    },
    {
      field: "code",
      headerName: "Code",
    },
    {
      field: "email",
      fieldValue: "Email",
    },
    {
      field: "status",
      headerName: "Status",
      valueGetter: (params: any) => {
        for (let codeValue of supplierStatusCodeValue) {
          if (codeValue.code === params.data.status) {
            return codeValue.value;
          }
        }
        return params.data.status;
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
    <div className="supplier">
      <div className="adjust-button" style={{ display: "flex", float: "left" }}>
        <Button
          onClick={() => goBack()}
          variant="outlined"
          startIcon={<IoIcons.IoIosArrowRoundBack />}
        >
          Back
        </Button>
      </div>

      <div style={{ display: "flex", float: "right" }}>
        <div className="adjust-button">
          <Button
            variant="contained"
            onClick={() => goToCreate()}
            startIcon={<IoIcons.IoMdAddCircle />}
          >
            Create
          </Button>
        </div>

        <div className="adjust-button">
          <Button
            variant="contained"
            onClick={() => goToUpdate()}
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

      <br></br>
      <br></br>

      <Card style={{ padding: "12px" }}>
        <div className="ag-theme-quartz" style={{ width: "100%", padding: 6 }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={supplierList}
            domLayout={"autoHeight"}
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{ resizable: true }}
            suppressAutoSize={true}
          />
        </div>
      </Card>
      {/* <Card style={{ padding: "12px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Code </TableCell>
                <TableCell> Email </TableCell>
                <TableCell> Status </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {supplierList.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        onChange={() => onCheck(item)}
                        style={{ padding: "0px", margin: "0px" }}
                      />
                    </TableCell>
                    <TableCell> {item.name} </TableCell>
                    <TableCell> {item.code} </TableCell>
                    <TableCell> {item.email} </TableCell>
                    <TableCell> {item.status} </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card> */}
    </div>
  );
}

export default SupplierDashboard;
