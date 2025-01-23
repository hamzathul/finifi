import mongoose, { Document, Schema } from "mongoose"

export interface Invoice extends Document {
    vendorName: string;
    invoiceNumber: string;
    status: string;
    netAmount: number;
    invoiceDate: string;
    dueDate: string;
    department: string;
    costCenter: string;
    poNumber: string;
    createdAt: Date;
}

const invoiceSchema:Schema = new mongoose.Schema({
    vendorName: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    status: { type: String, required: true },
    netAmount: { type: Number, required: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    department: { type: String, required: true },
    costCenter: { type: String, required: true },
    poNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Invoice = mongoose.models.Invoice || mongoose.model<Invoice>("Invoice", invoiceSchema);

export default Invoice