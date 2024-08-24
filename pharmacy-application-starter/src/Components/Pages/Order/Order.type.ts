export type OrderInfo = {
  orderNumber: string;
  sequenceNumber: string;
  billNumber: string;
  transactionId: string;
  orderDate: Date;
  lastModifiedDate: Date;
  uhid: number;
  status: string;
  orderDetails: OrderItems[];
};

export type OrderItems = {
  id: string;
  supplierCode: string;
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
  billReceivableDetailsId: string;
  sgst: number; // Transient
  cgst: number; // Transient
};
