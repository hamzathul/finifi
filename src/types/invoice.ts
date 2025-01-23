import { ObjectId } from "mongoose";

export type InvoiceStatus =
  | "Open"
  | "Awaiting Approval"
  | "Approved"
  | "Processing"
  | "Paid"
  | "Rejected"
  | "Vendor not found"
  | "Duplicate"
  | "Void";

export interface Invoice {
  _id: ObjectId;
  vendorName: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  netAmount: number;
  invoiceDate: Date;
  dueDate: Date;
  department: string;
  costCenter: string;
  poNumber: string;
  createdAt: string;
}
