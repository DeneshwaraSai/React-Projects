import {
  Button,
  Card,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

function DrugDashboard() {
  const navigate = useNavigate();
  const [typeCodeValue, setTypeCodeValue] = useState<CodeValue[]>([]);
  const [statusCodeValue, setStatusCodeValue] = useState<CodeValue[]>([]);
  const [drugList, setDrugList] = useState<DrugInfo[]>([]);

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
        }
      })
      .catch((err) => console.log(err));

    axios(PHARMACY_HOST_NAME + EndPoints.DRUG_LIST)
      .then((res) => {
        console.log(res.data);
        setDrugList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const goBack = () => {
    navigate("/Setups");
  };

  const getTypeByCode = (code: String) => {
    const codeValue = typeCodeValue.find((item) => item.code === code);
    return codeValue ? codeValue.value : code;
  };

  const getStatusByCode = (code: string) => {
    const codeValue = statusCodeValue.find((item) => item.code === code);
    return codeValue ? codeValue.value : code;
  };

  const handleCheckBox = (index: number, item: DrugInfo) => {
    console.log(index);
    console.log(item);
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
              variant="contained"
              onClick={() => goToCreate()}
              startIcon={<FaIcons.FaEdit />}
            >
              Update
            </Button>
          </div>

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
              variant="text"
              onClick={() => goToUpdate()}
              startIcon={<MdIcons.MdDelete />}
              sx={{ color: "#ff0000", border: "1px solid #ff0000" }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      {/* <DrugTable></DrugTable> */}

      <Card style={{ padding: "12px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Type </TableCell>
                <TableCell> HSN Code </TableCell>
                <TableCell> CGST % </TableCell>
                <TableCell> SGST % </TableCell>
                <TableCell> Generic Name </TableCell>
                <TableCell> Status </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {drugList.map((item: DrugInfo, index: number) => {
                return (
                  <TableRow key={index + 1}>
                    <TableCell>
                      <Checkbox
                        onChange={() => {
                          handleCheckBox(index, item);
                        }}
                        style={{ padding: "0", margin: "0" }}
                      ></Checkbox>
                    </TableCell>
                    <TableCell> {item.name} </TableCell>
                    <TableCell> {getTypeByCode(item.type + "")} </TableCell>
                    <TableCell> {item.hsnCode} </TableCell>
                    <TableCell> {item.cgst} </TableCell>
                    <TableCell> {item.sgst} </TableCell>
                    <TableCell> {item.genericName} </TableCell>
                    <TableCell> {getStatusByCode(item.status + "")} </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default DrugDashboard;
