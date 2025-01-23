"use client";

import React, { useState, useEffect } from "react";
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

interface UpdateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (invoice: Partial<Invoice>) => void;
  invoice: Invoice | null;
}

const UpdateInvoiceModal: React.FC<UpdateInvoiceModalProps> = ({
  open,
  onClose,
  onSubmit,
  invoice,
}) => {
  const [formData, setFormData] = useState<Partial<Invoice>>({});

  // Update form data when invoice prop changes
  useEffect(() => {
    if (invoice) {
      setFormData({
        _id: invoice._id,
        vendorName: invoice.vendorName,
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        netAmount: invoice.netAmount,
        //@ts-ignore
        invoiceDate: invoice.invoiceDate
          ? new Date(invoice.invoiceDate).toISOString().split("T")[0]
          : "",
          //@ts-ignore
        dueDate: invoice.dueDate
          ? new Date(invoice.dueDate).toISOString().split("T")[0]
          : "",
        department: invoice.department,
        costCenter: invoice.costCenter,
        poNumber: invoice.poNumber,
      });
    }
  }, [invoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      netAmount: Number(formData.netAmount),
    });
    onClose();
  };

  if (!invoice) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update Invoice</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <TextField
              label="Vendor Name"
              required
              value={formData.vendorName || ""}
              onChange={(e) =>
                setFormData({ ...formData, vendorName: e.target.value })
              }
            />
            <TextField
              label="Invoice Number"
              required
              value={formData.invoiceNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, invoiceNumber: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status || "Open"}
                label="Status"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    //@ts-ignore
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Vendor not found">Vendor not found</MenuItem>
                <MenuItem value="Duplicate">Duplicate</MenuItem>
                <MenuItem value="Void">Void</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Net Amount"
              type="number"
              required
              value={formData.netAmount || ""}
              onChange={(e) =>
                //@ts-ignore
                setFormData({ ...formData, netAmount: e.target.value })
              }
            />
            <TextField
              label="Invoice Date"
              type="date"
              required
              value={formData.invoiceDate || ""}
              onChange={(e) =>
                //@ts-ignore
                setFormData({ ...formData, invoiceDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Due Date"
              type="date"
              required
              value={formData.dueDate || ""}
              onChange={(e) =>
                //@ts-ignore
                setFormData({ ...formData, dueDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Department"
              value={formData.department || ""}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
            <TextField
              label="Cost Center"
              value={formData.costCenter || ""}
              onChange={(e) =>
                setFormData({ ...formData, costCenter: e.target.value })
              }
            />
            <TextField
              label="PO Number"
              value={formData.poNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, poNumber: e.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Update Invoice
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateInvoiceModal;
