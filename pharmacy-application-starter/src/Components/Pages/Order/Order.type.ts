export type Order = {
  orderNumber: string;
  sequenceNumber: string;
  billNumber: string;
  transactionId: string;
  orderDate: Date;
  lastModifiedDate: Date;
  uhid: number;
  status: string;
  amountPaid: number;
  dueAmount: number;
  createdBy: string;
  lastModifiedBy: string;
  orderDetails: OrderItems[];
};

export type OrderItems = {
  id: string | null;
  supplierCode: string;
  supplierName: string;
  batchNumber: string;
  drugId: string;
  drugName: string; // Transient
  taxCategory: string;
  expiryDate: Date;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount: number;
  discountPerc: number;
  billReceivableDetailsId: string | null;
  netAmount: number;
  sgst: number; // Transient
  cgst: number; // Transient
  sgstAmount: number; // Transient
  cgstAmount: number; // Transient
};

export type InventorySearchDto = {
  batchNumber: string;
  cgst: number;
  drugCode: number;
  drugName: string;
  expiryDate: Date;
  hsnCode: string;
  quantity: number;
  sellingCost: number;
  sgst: number;
  supplierCode: string;
  supplierName: string;
  totalSellingCost: number;
};

export type CashReceipt = {
  transactionId: string;
  billNumber: string;
  amountPaid: number;
  paymentType: string;
  bankName: string;
  billAmount: number;
  notes: string;
  receivedDate: Date;
  receivedBy: string;
  referenceNumber: string;
  discountPerc: number;
  discountAmount: number;
  totalAmount: number;
  taxes: number;
  receiptType: string;
};

export const initialCashReceipt: CashReceipt = {
  transactionId: "",
  billNumber: "",
  amountPaid: 0.0,
  paymentType: "C",
  bankName: "",
  billAmount: 0.0,
  notes: "",
  receivedDate: new Date(),
  receivedBy: "",
  referenceNumber: "",
  discountPerc: 0.0,
  discountAmount: 0.0,
  totalAmount: 0.0,
  taxes: 0.0,
  receiptType:"PH"
};

export type OrderRequest = {
  orderInfo: Order;
  cashReceipt: CashReceipt;
};

export type OrderState = {
  orderInfo: Order;
  cashReceipt: CashReceipt;
  orderItems: OrderItems[];
  showPayment: boolean;
  errorMessage: string[];
  openSnackBar:boolean;
};

export const initialOrderState: OrderState = {
  orderInfo: {
    orderNumber: "",
    sequenceNumber: "",
    billNumber: "",
    transactionId: "",
    orderDate: new Date(),
    lastModifiedDate: new Date(),
    uhid: 0,
    status: "",
    amountPaid: 0,
    dueAmount: 0,
    createdBy: "",
    lastModifiedBy: "",
    orderDetails: [],
  },
  cashReceipt: initialCashReceipt,
  orderItems: [],
  showPayment: false,
  errorMessage: [],
  openSnackBar: false
};

export const orderInfoColumnDefs: any[] = [
  {
    field: "drugName",
    fieldValue: "Drug Name",
  },
  {
    field: "quantity",
    fieldValue: "Quantity",
  },
  {
    field: "unitPrice",
    fieldValue: "Unit Price",
  },
  {
    field: "totalPrice",
    fieldValue: "Total Price",
  },
  {
    field: "discountPerc",
    fieldValue: "Discount %",
  },
  {
    field: "discountAmount",
    fieldValue: "Discount Amt",
  },
  {
    field: "taxes",
    fieldValue: "Taxes",
    cellRenderer: (params: any) => {
      const taxes =
        Number(params.data.sgstAmount) + Number(params.data.cgstAmount);
      return `${taxes}`;
    },
  },

  {
    field: "netAmount",
    fieldValue: "Net Amount",
  },
];
