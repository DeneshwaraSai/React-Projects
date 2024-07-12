// import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { NavigationType } from "./NavigationTypes";

export const SideBarData:NavigationType[] = [
  {
    title: "Home",
    resourceId: "",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Patient Registration",
    resourceId: "",
    path: "/patientRegistration",
    icon: <IoIcons.IoIosAddCircle />,
    cName: "nav-text",
  },
  {
    title: "Inventory",
    resourceId: "",
    path: "/inventory",
    icon: <MdIcons.MdInventory />,
    cName: "nav-text",
  },
  {
    title: "Order",
    resourceId: "",
    path: "/order",
    icon: <MdIcons.MdLocalPharmacy />,
    cName: "nav-text",
  },
  {
    title: "Stock",
    resourceId: "",
    path: "/stock",
    icon: <AiIcons.AiOutlineStock />,
    cName: "nav-text",
  },
  {
    title: "Message",
    resourceId: "",
    path: "/message",
    icon: <MdIcons.MdMessage />,
    cName: "nav-text",
  },
];