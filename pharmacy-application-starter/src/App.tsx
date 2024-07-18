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
import setups from "./Components/Pages/setup";
import DrugDashboard from "./Components/Pages/Setups/Drug/DrugDashboard";
import DrugSetup from "./Components/Pages/Setups/Drug/DrugSetup";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" Component={Home} />
            {/* <Route path="/utils" Component={AppUtils} /> */}
            <Route path="/home" Component={Home} />
            <Route path="/PatientRegistration" Component={PatientReg} />
            <Route path="/inventory" Component={InventoryDetails} />
            <Route path="/order" Component={Order} />

            <Route path="/Setups" Component={setups} />
            <Route path="/Setups/Drug/Dashboard" Component={DrugDashboard} />
            <Route path="/Setups/Drug/create" Component={DrugSetup} />
            <Route path="/Setups/Drug/update" Component={DrugSetup} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
