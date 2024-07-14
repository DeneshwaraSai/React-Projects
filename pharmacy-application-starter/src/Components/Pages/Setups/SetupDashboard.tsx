import { Card } from "@mui/material";
import React from "react";
import { setupInfo } from "./SetupItems";
import "./Setup.style.css";
import { useNavigate } from "react-router-dom";

function SetupDashboard() {
  const navigate = useNavigate();

  const handlerNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container">
      <div className="row">
        {setupInfo.map((item, index) => (
          <div className="col-20" key={index}>
            <div
              onClick={() => handlerNavigation(item.path)}
              style={{ cursor: "pointer" }}
            >
              <Card className="justify-content-center text-center">
                <br></br>
                <div> {item.iconName}</div>
                <div className="item-title">
                  <h4> {item.title} </h4>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetupDashboard;
