"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Invoice } from "@/types/invoice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const sampleInvoices: Invoice[] = [
      {
        id: "1",
        vendorName: "Volopay Pvt. Ltd.",
        invoiceNumber: "INV0001",
        status: "Open",
        netAmount: 2930.0,
        invoiceDate: "2024-03-18",
        dueDate: "2024-04-28",
        department: "Marketing",
        costCenter: "Bangalore",
        poNumber: "PO001",
        createdAt: "2024-04-28",
      },
      // Add more sample invoices as needed
    ];
    setInvoices(sampleInvoices);
  }, []);

  useEffect(() => {
    let filtered = invoices;

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (invoice) => invoice.status === selectedStatus
      );
    }

    setFilteredInvoices(filtered);
  }, [selectedStatus, invoices]);

  return (
    <div className="">
      <Header />
      <Navbar
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
    </div>
  );
}
