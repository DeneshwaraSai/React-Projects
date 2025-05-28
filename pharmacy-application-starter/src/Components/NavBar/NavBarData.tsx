import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as FaIcons  from "react-icons/fa";

import { NavigationType } from "./NavigationTypes";

export const SideBarData: NavigationType[] = [
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
    title: "Returns",
    resourceId: "",
    path: "/returns",
    icon: <MdIcons.MdKeyboardReturn />,
    cName: "nav-text",
  },
  {
    title: "Bill Dashboard",
    resourceId: "",
    path: "/billDashboard",
    icon: <FaIcons.FaMoneyBillAlt />,
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
  {
    title: "Setups",
    resourceId: "",
    path: "Setups",
    icon: <IoIcons.IoMdSettings />,
    cName: "nav-text",
  },
];
