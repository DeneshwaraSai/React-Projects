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
import SupplierDashboard from "./Components/Pages/Setups/Supplier/SupplierDashboard";
import SupplierSetup from "./Components/Pages/Setups/Supplier/SupplierSetup";

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
            <Route path="/Setups/Drug/update/:id" Component={DrugSetup} />
            <Route
              path="/Setups/Supplier/Dashboard"
              Component={SupplierDashboard}
            />
            <Route path="/Setups/Supplier/create" Component={SupplierSetup} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
