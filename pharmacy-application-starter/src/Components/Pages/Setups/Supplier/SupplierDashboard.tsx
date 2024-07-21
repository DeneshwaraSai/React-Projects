import { Button } from "@mui/material";
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SupplierDashboard() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/Setups");
  };

  return (
    <div className="supplier">
      <div> </div>
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
          <Button variant="contained" startIcon={<FaIcons.FaEdit />}>
            Create
          </Button>
        </div>

        <div className="adjust-button">
          <Button variant="contained" startIcon={<IoIcons.IoMdAddCircle />}>
            Update
          </Button>
        </div>

        <div className="adjust-button">
          <Button
            variant="outlined"
            startIcon={<MdIcons.MdDelete />}
            sx={{ color: "#ff0000", border: '1px solid #ff0000' }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;
