import { Order, OrderItems } from "./Order.type";

export const initialOrderInfo: Order = {
  orderNumber: "",
  sequenceNumber: "",
  billNumber: "",
  transactionId: "",
  orderDate: new Date(),
  lastModifiedDate: new Date(),
  uhid: 0,
  status: "P",
  amountPaid: 0.0,
  dueAmount: 0.0,
  createdBy: "admin",
  lastModifiedBy: "admin",
  orderDetails: [],
};

export const initialOrderItems: OrderItems = {
  id: "",
  supplierCode: "",
  supplierName: "",
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
  netAmount: 0,
  sgst: 0, // Transient
  cgst: 0, // Transient
};

export const orderTableHeaders: string[] = [
  "",
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
