import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavBar/NavigationBar";
import Home from "./Components/Pages/Home";
import PatientReg from "./Components/Pages/PatientReg";
import InventoryDetails from "./Components/Pages/InventoryDetails";
import Order from "./Components/Pages/Order";
import { Provider } from "react-redux";
import store from "./Components/Store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/PatientRegistration" Component={PatientReg} />
            <Route path="/inventory" Component={InventoryDetails} />
            <Route path="/order" Component={Order} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
