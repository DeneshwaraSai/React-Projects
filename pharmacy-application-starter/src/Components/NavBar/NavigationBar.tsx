import React, { useState } from "react";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { SideBarData } from "./NavBarData";
import "./NavBar.style.css";
import {
  Autocomplete,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { AutoCompleteType, PatientSearch } from "../common/GlobalTypes";
import { EndPoints, PHARMACY_HOST_NAME } from "../common/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { patientHeaderAction } from "../Header/PatientHeader.actions";

function NavigationBar() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("Deneshwara Sai");
  const [sidebar, setSidebar] = useState(false);
  const [patientDropDown, setPatientDropDown] = useState<AutoCompleteType[]>(
    []
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const dispatch = useDispatch();

  const showSlider = () => {
    setSidebar(!sidebar);
    console.log("In Nav bar", sidebar);
  };

  const inputSearch = (value: string) => {
    setPatientDropDown([]);

    console.log(value);
    if (value.length > 2) {
      setPatientDropDown([]);
      axios
        .get(
          (PHARMACY_HOST_NAME + EndPoints.SEARCH_PATIENT_BY_NAME).replace(
            "{value}",
            value
          )
        )
        .then((res: AxiosResponse<PatientSearch[]>) => {
          console.log(res.data);

          const patients = res.data.map((item, index) => {
            return {
              label: item.firstName + " " + item.lastName,
              value: item.uhid,
            };
          });
          console.log(patients);
          setPatientDropDown([])
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
        navigate("/home");
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
              sx={{ width: 300, height: 40 }}
              options={patientDropDown}
              renderOption={() =>
                patientDropDown.map((item, index) => {
                  return (
                    <li key={index} onClick={() => handleOnClick(item.value)}>
                      {item.label} - {item.value}
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

            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar />
                &nbsp; &nbsp;
                <h2 style={{ fontSize: 16, marginTop: 8, color: "black" }}>
                  {" "}
                  {username}{" "}
                </h2>
                &nbsp; &nbsp;
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem sx={{ width: 225, height: 50 }}>Profile</MenuItem>
                <MenuItem sx={{ width: 225, height: 50 }}>My account</MenuItem>
                <MenuItem
                  sx={{ width: 225, height: 50 }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
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
                    <div style={{ marginRight: "6px" }}> {item.icon} </div>
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
