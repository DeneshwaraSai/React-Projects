import React from "react";
import OrderInfo from "./Order/OrderInfo";
import OrderDetails from "./Order/OrderDetails";

function Order() {
  return (
    <div className="order">
      <h2> Order </h2>
      <OrderInfo /> 
    </div>
  );
}

export default Order;
