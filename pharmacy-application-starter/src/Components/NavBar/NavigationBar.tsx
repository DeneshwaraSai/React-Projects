import React, { useState } from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { SideBarData } from "./NavBarData";
import "./NavBar.style.css";
import { Autocomplete, Avatar, Stack, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { AutoCompleteType, PatientSearch } from "../common/GlobalTypes";
import { EndPoints, PHARMACY_HOST_NAME } from "../common/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { patientHeaderAction } from "../Header/PatientHeader.actions";

function NavigationBar() {
  const [username, setUserName] = useState("Deneshwara Sai");
  const [sidebar, setSidebar] = useState(false);
  const [patientDropDown, setPatientDropDown] = useState<AutoCompleteType[]>(
    []
  );

  const dispatch = useDispatch();

  const showSlider = () => {
    setSidebar(!sidebar);
    console.log("In Nav bar", sidebar);
  };

  const inputSearch = (value: string) => {
    console.log(value);
    if (value.length > 2) {
      axios
        .get(`http://localhost:8080/patient/search/${value}`)
        .then((res: AxiosResponse<PatientSearch[]>) => {
          console.log(res.data);

          const patients = res.data.map((item, index) => {
            return {
              label: item.firstName + " " + item.lastName,
              value: item.uhid,
            };
          });
          console.log(patients);
          setPatientDropDown(patients);
        })
        .catch((err) => console.log(err));
    } else {
      setPatientDropDown([]);
    }
  };

  const handleOnClick = (value: any) => {
    console.log(value);

    axios
      .get(
        PHARMACY_HOST_NAME +
          EndPoints.FIND_PATIENT_HEADER_BY_UHID.replace("{uhid}", value)
      )
      .then((res) => {
        console.log(res.data);
        dispatch(patientHeaderAction(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div style={{ display: "flex", float: "right" }}></div>

          <Stack direction="row" spacing={5}>
            <Autocomplete
              disablePortal
              size="small"
              className="search-input"
              placeholder="Search for name and phone number"
              id="combo-box-demo"
              sx={{ width: 300 }}
              options={patientDropDown}
              renderOption={() =>
                patientDropDown.map((item, index) => {
                  return (
                    <li key={index} onClick={() => handleOnClick(item.value)}>
                      {item.label}
                    </li>
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  placeholder="Search for name and phone number"
                  onChange={(e) => inputSearch(e.target.value)}
                />
              )}
            />

            {/* <div className="stretch-input">
             <input placeholder="search for name and phone number" type="text"  className="search-input small-placeholder" /> 
            </div> */}

            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar />
              &nbsp; &nbsp;
              {username}
              &nbsp; &nbsp;
            </div>
          </Stack>
        </div>

        <div className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={() => showSlider()}>
            <li className="navbar-toggle">Username</li>

            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li></li>
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default NavigationBar;
