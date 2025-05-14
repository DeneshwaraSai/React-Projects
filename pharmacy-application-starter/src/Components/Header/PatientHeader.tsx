import React from "react";
import { Card } from "@mui/material";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import "./PatientHeader.style.css";
import { useDispatch } from "react-redux";
import {
  patientHeaderActionClear,
} from "./PatientHeader.actions";
import { useNavigate } from "react-router-dom";

function PatientHeader(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patientHeader = props.patientHeader;

  return (
    <div>
      <Card className="card">
        <div className="container">
          <div className="row" style={{ height: "75px" }}>
            <div
              className="col-md-2"
              style={{ width: "auto", padding: 12, margin: 6 }}
            >
              <FaIcons.FaUser size={50} />
            </div>

            <div className="col">
              <h4 className="font-label"> Name </h4>
              {/* <p> Deneshwara Sai Ila </p> */}
              <p>
                {patientHeader?.firstName} {patientHeader?.lastName}{" "}
              </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Age/Sex </h4>
              {/* <p> 24 / M </p> */}
              <p>
                {patientHeader?.age}Y/ {patientHeader?.gender}{" "}
              </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Contact Number </h4>
              {/* <p> +1 *** *** **** </p> */}
              <p> {patientHeader?.phoneNumber}</p>
            </div>

            <div className="col">
              <h4 className="font-label"> UMR/UHID </h4>

              <p> {patientHeader?.uhid} </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Order Number </h4>
              <p>
                {" "}
                {patientHeader?.orderNumber
                  ? patientHeader?.orderNumber
                  : "-"}{" "}
              </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Order Status </h4>
              <p>
                {" "}
                {patientHeader?.orderStatus
                  ? patientHeader?.orderStatus
                  : "-"}{" "}
              </p>
            </div>
          </div>
        </div>

        <div style={{ float: "right", padding: 0, margin: 0 }}>
          <div className="close-search">
            <MdIcons.MdClear
              className="close-class"
              size={25}
              onClick={() => {
                dispatch(patientHeaderActionClear());
                navigate("/patient-search/SearchPatient")
              }}
            ></MdIcons.MdClear>
            &nbsp;&nbsp;
            <MdIcons.MdOutlineSearch
              className="search-class"
              size={25}
            ></MdIcons.MdOutlineSearch>
            &nbsp;&nbsp;
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PatientHeader;
