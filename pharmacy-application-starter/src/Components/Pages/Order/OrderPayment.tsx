import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import store from "../../Store/store";
import { CodeValue } from "../../Cache/Cache.types";
  
const OrderPayment = (props: any) => {
  const { cashReceipt } = props;

  const [paymentTypeCodeValue, setPaymentTypeCodeValue] = useState<CodeValue[]>(
    []
  );
  const [bankNameCodeValue, setBankNameCodeValue] = useState<CodeValue[]>([]);

  useEffect(() => {
    store
      .getState()
      .cacheReducer.then((res) => {
        if (res) {
          setPaymentTypeCodeValue(
            res.codeValue["PAYMENT_TYPE"] ? res.codeValue["PAYMENT_TYPE"] : []
          );
          setBankNameCodeValue(
            res.codeValue["BANK_NAME"] ? res.codeValue["BANK_NAME"] : []
          );
        }
      })
      .catch((err) => {
        throw new Error("Error while fetching codeValues.");
      });
  }, []);

  const onChangePayment = (fieldName: string, fieldValue: number | String) => {
    props.onChangePayment(fieldName, fieldValue);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <FormControl fullWidth>
              <InputLabel> Payment Type * </InputLabel>
              <Select
                label="Payment Type"
                placeholder="Payment Type"
                value={cashReceipt.paymentType}
                name="paymentType"
                fullWidth
                required={true}
                onChange={(e) => {
                  onChangePayment(e.target.name, e.target.value);
                }}
              >
                {paymentTypeCodeValue &&
                  paymentTypeCodeValue.map((codeValue) => {
                    return (
                      <MenuItem value={String(codeValue.code)}>
                        {codeValue.value}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          {cashReceipt.paymentType != "C" && (
            <React.Fragment>
              <div className="col">
                <FormControl fullWidth>
                  <InputLabel> Bank Name * </InputLabel>
                  <Select
                    label="Bank Name"
                    placeholder="Bank Name"
                    value={cashReceipt.bankName}
                    name="bankName"
                    required={true}
                    fullWidth
                    onChange={(e) => {
                      onChangePayment(e.target.name, e.target.value);
                    }}
                  >
                    {bankNameCodeValue &&
                      bankNameCodeValue.map((codeValue) => {
                        return (
                          <MenuItem value={String(codeValue.code)}>
                            {codeValue.value}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>

              <div className="col">
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Reference Number"
                  label="Reference Number"
                  value={cashReceipt.referenceNumber}
                  name="referenceNumber"
                  onChange={(e) => {
                    onChangePayment(e.target.name, e.target.value);
                  }}
                  required={true}
                />
              </div>
            </React.Fragment>
          )}

          <div className="col">
            <TextField
              fullWidth
              type="number"
              disabled={true}
              placeholder="Total Amount"
              label="Total Amount"
              value={cashReceipt.totalAmount}
              name="totalAmount"
              onChange={(e) => {
                onChangePayment(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <TextField
              type="number"
              fullWidth
              placeholder="Discount %"
              label="Discount %"
              disabled={true}
              value={cashReceipt.discountPerc}
              name="discountPerc"
              onChange={(e) => {
                onChangePayment(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="col">
            <TextField
              type="number"
              fullWidth
              placeholder="Discount Amt"
              label="Discount Amt"
              disabled={true}
              value={cashReceipt.discountAmount}
              name="discountAmount"
              onChange={(e) => {
                onChangePayment(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="col">
            <TextField
              fullWidth
              type="number"
              disabled={true}
              placeholder="Bill Amount"
              label="Bill Amount"
              value={cashReceipt.billAmount}
              name="billAmount"
              onChange={(e) => {
                onChangePayment(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="col">
            <TextField
              fullWidth
              type="number"
              label="Received Amount"
              placeholder="Received Amount"
              disabled={true}
              value={cashReceipt.amountPaid}
              name="amountPaid"
              onChange={(e) => {
                onChangePayment(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <TextField
              fullWidth
              label="Notes"
              placeholder="Notes"
              inputProps={{
                maxLength: 50,
              }}
              value={cashReceipt.notes}
              name="notes"
              onChange={(e) => {
                onChangePayment(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
