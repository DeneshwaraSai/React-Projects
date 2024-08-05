import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./InventoryPayment.style.css";
import { Payment, PaymentInfo } from "./Inventory.type";
import * as AiIcons from "react-icons/ai";

function InventoryPayment() {
  const initialPayment: Payment = {
    id: undefined,
    paymentMethod: "",
    paymentAmount: 0.0,
    paymentDate: new Date(),
    paymentNodes: "",
  };

  const initialPaymentInfo: PaymentInfo = {
    show: true,
    paymentDetails: [
      {
        id: undefined,
        paymentMethod: "",
        paymentAmount: 0.0,
        paymentDate: new Date(),
        paymentNodes: "",
      },
    ],
  };

  const [paymentDetails, setPaymentDetails] =
    useState<PaymentInfo>(initialPaymentInfo);

  const addPayment = () => {
    setPaymentDetails({
      ...paymentDetails,
      paymentDetails: [...paymentDetails.paymentDetails, initialPayment],
    });
  };

  const deleteRecord = (index: number) => {
    console.log(index);
    const newPaymentDetails = paymentDetails.paymentDetails.filter(
      (_, i) => i !== index
    );
    console.log(newPaymentDetails);
    // setPaymentDetails({
    //   show: true,
    //   paymentDetails: newPaymentDetails,
    // });
  };

  const onChangePayment = (event: any, index: number) => {
    console.log(index);
    console.log(event.target.name, event.target.value);

    const details = paymentDetails.paymentDetails.map(
      (payment: Payment, i: number) =>
        i === index
          ? { ...payment, [event.target.name]: event.target.value }
          : payment
    );

    setPaymentDetails({
      show: true,
      paymentDetails: details,
    });
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <p className="payment-details"> Payment Details </p> &nbsp; &nbsp;
          &nbsp; &nbsp;
          <p className="payment-info"> Total Paid: 0.00 | Pending : 0.00 </p>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Button variant="contained" onClick={() => addPayment()}>
              Add
            </Button>
          </div>
          <br></br>

          {paymentDetails.show &&
            paymentDetails.paymentDetails.map((item, index) => {
              return (
                <div className="container" key={index}>
                  <div className="row">
                    <div className="col">
                      <TextField
                        fullWidth
                        name="paymentMethod"
                        onChange={(event) => onChangePayment(event, index)}
                        placeholder="Payment Method"
                      />
                    </div>

                    <div className="col">
                      <TextField
                        fullWidth
                        type="number"
                        name="paymentAmount"
                        onChange={(event) => onChangePayment(event, index)}
                        placeholder="Amount"
                      />
                    </div>

                    <div className="col">
                      <TextField
                        fullWidth
                        type="date"
                        name="paymentDate"
                        onChange={(event) => onChangePayment(event, index)}
                        placeholder="Payment Date"
                      />
                    </div>

                    <div className="col">
                      <TextField
                        fullWidth
                        name="paymentNodes"
                        onChange={(event) => onChangePayment(event, index)}
                        placeholder="Notes"
                      />
                    </div>

                    <div className="col">
                      <IconButton
                        onClick={() => {
                          deleteRecord(index);
                        }}
                        color="error"
                      >
                        <AiIcons.AiFillHome />
                      </IconButton>
                    </div>
                  </div>
                </div>
              );
            })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default InventoryPayment;
