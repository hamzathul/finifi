import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Invoice } from "@/types/invoice";
import { ObjectId } from "mongoose";

interface InvoiceTableProps {
  invoices: Invoice[];
  loading?: boolean;
  onDelete: (id: ObjectId) => void;
  onUpdate: (invoice: Partial<Invoice>) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  loading,
  onDelete,
  onUpdate,
}) => {
  const columns: GridColDef[] = [
    { field: "vendorName", headerName: "Vendor Name", flex: 1 },
    { field: "invoiceNumber", headerName: "Invoice" },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <div
          className={`px-3 py-2 mt-1 rounded-full text-sm text-center ${getStatusColor(
            params.value
          )}`}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "netAmount",
      headerName: "Net Amount",
      renderCell: (params: any) => <div>₹{params.value.toLocaleString()}</div>,
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      valueFormatter: (params: string) => {
        const date = new Date(params);
        const formattedDate = date.toLocaleDateString("en-GB"); // 'en-GB' uses the format dd/mm/yyyy
        return formattedDate.replace(/\//g, "-"); // Replace slashes with dashes
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      valueFormatter: (params: string) => {
        const date = new Date(params);
        const formattedDate = date.toLocaleDateString("en-GB"); // 'en-GB' uses the format dd/mm/yyyy
        return formattedDate.replace(/\//g, "-"); // Replace slashes with dashes
      },
    },
    { field: "department", headerName: "Department" },
    { field: "costCenter", headerName: "Cost Center" },
    {
      field: "action",
      headerName: "Actions",
      flex:1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(params.row)}
            className="text-blue-600 hover:underline hover:text-blue-950"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(params.row._id)}
            className="text-red-600 hover:underline hover:text-red-950"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      Open: "bg-blue-100 text-blue-800",
      "Awaiting Approval": "bg-purple-100 text-purple-800",
      Approved: "bg-green-100 text-green-800",
      Processing: "bg-yellow-100 text-yellow-800",
      Paid: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      "Vendor not found": "bg-orange-100 text-orange-800",
      Duplicate: "bg-gray-100 text-gray-800",
      Void: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="h-[calc(100vh-200px)] w-full">
      <DataGrid
        rows={invoices}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default InvoiceTable;
