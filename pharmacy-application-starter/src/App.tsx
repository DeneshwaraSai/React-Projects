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
import SetupDashboard from "./Components/Pages/Setups/SetupDashboard";
import setups from "./Components/Pages/setup";
import DrugDashboard from "./Components/Pages/Setups/Drug/DrugDashboard";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/PatientRegistration" Component={PatientReg} />
            <Route path="/inventory" Component={InventoryDetails} />
            <Route path="/order" Component={Order} />

            <Route path="/Setups" Component={setups} />
            <Route path="/Setups/Drug/Dashboard" Component={DrugDashboard} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
