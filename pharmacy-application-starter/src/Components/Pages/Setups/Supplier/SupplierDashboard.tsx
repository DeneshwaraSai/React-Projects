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
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { EndPoints, PHARMACY_HOST_NAME } from "../../../common/endPoints";
import { Supplier } from "./Supplier.type";

function SupplierDashboard() {
  const navigate = useNavigate();

  const [supplierList, setSupplierList] = useState<Supplier[]>([]);

  useEffect(() => {
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
    navigate("/Setups/Supplier/update");
  };

  const onCheck = (item: Supplier) => {
    console.log(item);
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
            startIcon={<FaIcons.FaEdit />}
          >
            Create
          </Button>
        </div>

        <div className="adjust-button">
          <Button
            variant="contained"
            onClick={() => goToUpdate()}
            startIcon={<IoIcons.IoMdAddCircle />}
          >
            Update
          </Button>
        </div>

        <div className="adjust-button">
          <Button
            variant="outlined"
            startIcon={<MdIcons.MdDelete />}
            sx={{ color: "#ff0000", border: "1px solid #ff0000" }}
          >
            Delete
          </Button>
        </div>
      </div>

      <br></br>
      <br></br>

      <Card style={{ padding: "12px" }}>
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
      </Card>
    </div>
  );
}

export default SupplierDashboard;
