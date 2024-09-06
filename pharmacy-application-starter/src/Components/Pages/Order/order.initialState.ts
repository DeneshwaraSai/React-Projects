import { OrderItems } from "./Order.type";

export const initialOrderItems: OrderItems = {
  id: "",
  supplierCode: "",
  batchNumber: "",
  drugId: "",
  drugName: "", // Transient
  taxCategory: "",
  expiryDate: new Date(),
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
  discountAmount: 0,
  discountPerc: 0,
  billReceivableDetailsId: "",
  sgst: 0, // Transient
  cgst: 0, // Transient
};

export const orderTableHeaders: string[] = [
  "Name",
  "Supplier",
  "Batch Number",
  "Hsn Code",
  "Expiry Date",
  "Quantity",
  "Price",
  "Total Price",
  "Discount %",
  "Discount Amount",
  "Net Amount",
  "",
];
