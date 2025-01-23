"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Invoice, InvoiceStatus } from "@/types/invoice";

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (invoice: Partial<Invoice>) => void;
}

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{
    vendorName: any;
    invoiceNumber: any;
    status: any;
    netAmount: any;
    invoiceDate: any;
    dueDate: any;
    department: any;
    costCenter: any;
    poNumber: any;
  }>({
    vendorName: "",
    invoiceNumber: "",
    status: "Open",
    netAmount: "",
    invoiceDate: null,
    dueDate: null,
    department: "",
    costCenter: "",
    poNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    onSubmit({
      ...formData,
      netAmount: Number(formData.netAmount),
      invoiceDate: formData.invoiceDate || new Date().toISOString(),
      dueDate: formData.dueDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    onClose();
    setFormData({
      vendorName: "",
      invoiceNumber: "",
      status: "Open",
      netAmount: "",
      invoiceDate: null,
      dueDate: null,
      department: "",
      costCenter: "",
      poNumber: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Invoice</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Vendor Name"
              required
              value={formData.vendorName}
              onChange={(e) =>
                setFormData({ ...formData, vendorName: e.target.value })
              }
            />
            <TextField
              label="Invoice Number"
              required
              value={formData.invoiceNumber}
              onChange={(e) =>
                setFormData({ ...formData, invoiceNumber: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Net Amount"
              type="number"
              required
              value={formData.netAmount}
              onChange={(e) =>
                setFormData({ ...formData, netAmount: e.target.value })
              }
            />
            {/* Invoice Date */}
            <TextField
              label="Invoice Date"
              type="date"
              required
              value={formData.invoiceDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, invoiceDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* Due Date */}
            <TextField
              label="Due Date"
              type="date"
              required
              value={formData.dueDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
            <TextField
              label="Cost Center"
              value={formData.costCenter}
              onChange={(e) =>
                setFormData({ ...formData, costCenter: e.target.value })
              }
            />
            <TextField
              label="PO Number"
              value={formData.poNumber}
              onChange={(e) =>
                setFormData({ ...formData, poNumber: e.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Invoice
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateInvoiceModal;
