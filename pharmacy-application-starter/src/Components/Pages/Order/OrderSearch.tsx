import { Autocomplete, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { EndPoints, PHARMACY_HOST_NAME } from "../../common/endPoints";
import { InventorySearchDto, OrderItems } from "./Order.type";

function OrderSearch({ addDetails }: any) {
  const [orderDropDown, setOrderDropDown] = useState<InventorySearchDto[]>([]);
  const [searchValue, setSearchValue] = useState(null);

  const handleChange = (selectedOption: any) => {
    const option = selectedOption.value;
    console.log(option);

    const item: OrderItems = {
      id: null,
      supplierCode: option.supplierCode,
      supplierName: option.supplierName,
      batchNumber: option.batchNumber,
      drugId: String(option.drugCode),
      drugName: option.drugName,
      taxCategory: option.hsnCode,
      expiryDate: option.expiryDate,
      quantity: 1,
      unitPrice: option.sellingCost,
      totalPrice: option.sellingCost,
      discountAmount: 0,
      discountPerc: 0,
      billReceivableDetailsId: null,
      netAmount: option.sellingCost,
      sgst: option.sgst, // Transient
      cgst: option.cgst, // Transient
      sgstAmount: 0,
      cgstAmount: 0,
    };
    console.log(searchValue);
    setSearchValue(null);
    addDetails(item);
  };

  const onSearchInput = (event: any) => {

    const value: string = event.target?.value;
    setSearchValue(null);
    if (value.length >= 3) {
      axios
        .get(
          PHARMACY_HOST_NAME +
            EndPoints.INVENTORY_ORDER_SEARCH.replace("{name}", value)
        )
        .then((res) => {
          console.log(res);
          setOrderDropDown(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col">
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                placeholder="Search using medicine, supplier, batch number"
                id="search"
                value={searchValue}
                options={orderDropDown?.map((item, index) => ({
                  label: `${item.drugName} - ${item.supplierName} - ${item.batchNumber}`,
                  value: item,
                }))}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      onInput={(event) => {
                        onSearchInput(event);
                      }}
                      label="Search using medicine, supplier, batch number"
                    ></TextField>
                  );
                }}
                onChange={(event, option) => {
                  handleChange(option);
                }}
              />
            </FormControl>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default OrderSearch;
