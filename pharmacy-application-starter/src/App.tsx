import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavBar/NavigationBar";
import Home from "./Components/Pages/Home";
import PatientReg from "./Components/Pages/PatientReg";
import Order from "./Components/Pages/Order";
import { Provider } from "react-redux";
import store from "./Components/Store/store";
import setups from "./Components/Pages/setup";
import DrugDashboard from "./Components/Pages/Setups/Drug/DrugDashboard";
import DrugSetup from "./Components/Pages/Setups/Drug/DrugSetup";
import SupplierDashboard from "./Components/Pages/Setups/Supplier/SupplierDashboard";
import SupplierSetup from "./Components/Pages/Setups/Supplier/SupplierSetup";
import Inventory from "./Components/Pages/Inventory";
import InventoryDetails from "./Components/Pages/Inventory/InventoryDetails";
import Login from "./Components/Auth/Login";
import OrderSuccessPage from "./Components/Pages/Order/OrderSuccessPage";
import SearchPatient from "./Components/Pages/patient-search/searchPatient";
import BillDashboard from "./Components/Pages/BillDashboard";
import ReturnsPage from "./Components/Pages/ReturnsPage";

function App() {
  console.log(sessionStorage.getItem("login"));
  return (
    <>
      <Provider store={store}>
        {(!sessionStorage.getItem("login") && (
          <Router>
            <Routes>
              <Route path="/" Component={Login}></Route>
            </Routes>
          </Router>
        )) || (
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/home" Component={Home} />
              <Route path="/PatientRegistration" Component={PatientReg} />
              <Route path="/inventory" Component={Inventory} />
              <Route path="/order" Component={Order} />
              <Route
                path="/patient-search/SearchPatient"
                Component={SearchPatient}
              />

              <Route path="/billDashboard" Component={BillDashboard} />
              <Route path="/returns" Component={ReturnsPage} />

              <Route path="/Setups" Component={setups} />
              <Route path="/Setups/Drug/Dashboard" Component={DrugDashboard} />
              <Route path="/Setups/Drug/create" Component={DrugSetup} />
              <Route path="/Setups/Drug/update/:id" Component={DrugSetup} />
              <Route
                path="/order/OrderSuccessPage"
                element={<OrderSuccessPage />}
              />

              <Route
                path="/Setups/Supplier/Dashboard"
                Component={SupplierDashboard}
              />
              <Route path="/Setups/Supplier/create" Component={SupplierSetup} />
              <Route
                path="/Setups/Supplier/update/:id"
                Component={SupplierSetup}
              />

              <Route path="/inventory/create" Component={InventoryDetails} />
              <Route
                path="/inventory/update/:id"
                Component={InventoryDetails}
              />
            </Routes>
          </Router>
        )}
      </Provider>
    </>
  );
}

export default App;
