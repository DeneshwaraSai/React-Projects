import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import "./DrugDashboard.style.css";

function DrugDashboard() {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/Setups/Drug/create");
  };

  const goToUpdate = () => {
    navigate("/Setups/Drug/create");
  };

  const goBack = () => {
    navigate("/Setups");
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
              sx={{ color: "#ff0000" }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrugDashboard;
