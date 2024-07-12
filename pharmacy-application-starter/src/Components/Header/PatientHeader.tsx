import React from "react";
import { Card } from "@mui/material";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import "./PatientHeader.style.css";
import { useDispatch, useSelector } from "react-redux";

function PatientHeader(props: any) {
  
  const patientHeader = useSelector((state: any) => state.patientReducer);
  const dispatch = useDispatch();
 
  console.log(patientHeader);
  console.log(props);

  return (
    <div>
      <Card className="card">
        <div className="container">
          <div className="row">
            <div
              className="col-md-2"
              style={{ width: "auto", padding: 12, margin: 6 }}
            >
              <FaIcons.FaUser size={50} />
            </div>

            <div className="col">
              <h4 className="font-label"> Name </h4>
              <p> Deneshwara Sai Ila </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Age/Sex </h4>
              <p> 24 / M </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Contact Number </h4>
              <p> +1 *** *** **** </p>
            </div>

            <div className="col">
              <h4 className="font-label"> UMR/UHID </h4>
              <p> 56565 </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Order Number </h4>
              <p> 56565 </p>
            </div>

            <div className="col">
              <h4 className="font-label"> Order Status </h4>
              <p> Completed </p>
            </div>
          </div>
        </div>
        <div>
          <div className="col">
            <div className="close-search">
              <MdIcons.MdClear
                className="close-class"
                size={25}
              ></MdIcons.MdClear>
              &nbsp;&nbsp;
              <MdIcons.MdOutlineSearch
                className="search-class"
                size={25}
              ></MdIcons.MdOutlineSearch>
              &nbsp;&nbsp;
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PatientHeader;
