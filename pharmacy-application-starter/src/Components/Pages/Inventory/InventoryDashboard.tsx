import { Button, Card, TextField } from "@mui/material";
import React from "react";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import "./InventoryDashboard.style.css";

function InventoryDashboard() {
  return (
    <div>
      <Card style={{ padding: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <TextField
                fullWidth
                placeholder="Supplier Name"
                label="Supplier Name"
              />
            </div>

            <div className="col">
              <TextField
                fullWidth
                placeholder="Invoice Number"
                label="Invoice Number"
              />
            </div>

            <div className="col">
              <TextField fullWidth placeholder="Drug name" label="Drug name" />
            </div>

            <div className="col">
              <TextField
                type="date"
                fullWidth
                placeholder="Date Range"
                label="Date Range"
              />
              {/* <SingleInputDateRangeField label="Date from - Date To" /> */}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", float: "right" }}>
          <div className="button-padding">
            <Button variant="outlined"> Cancel </Button>
          </div>
          <div className="button-padding">
            <Button variant="contained"> Submit </Button>
          </div>
        </div>
      </Card>
      <div style={{ display: "flex", float: "right" }}>
        <div className="button-padding">
          <Button variant="contained" startIcon={<IoIcons.IoMdAddCircle />}>
            Create
          </Button>
        </div>
        <div className="button-padding">
          <Button variant="contained" startIcon={<FaIcons.FaEdit />}>
            Update
          </Button>
        </div>
        <div className="button-padding">
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
  );
}

export default InventoryDashboard;
