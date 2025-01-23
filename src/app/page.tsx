"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import { Invoice } from "@/types/invoice";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreateInvoiceModal from "@/components/CreateInvoiceModal";
import InvoiceTable from "@/components/InvoiceTable";
import axios from "axios";
import { ObjectId } from "mongoose";
import UpdateInvoiceModal from "@/components/UpdateInvoiceModal";
import toast from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<
    "vendorName" | "invoiceNumber"
  >("vendorName");

  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/invoices");
        setInvoices(response.data);
        setFilteredInvoices(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    let filtered = invoices;

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (invoice) => invoice.status === selectedStatus
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((invoice) => {
        if (searchFilter === "vendorName") {
          return invoice.vendorName.toLowerCase().includes(query);
        } else {
          return invoice.invoiceNumber.toLowerCase().includes(query);
        }
      });
    }

    setFilteredInvoices(filtered);
  }, [invoices, selectedStatus, searchQuery, searchFilter]);

  const handleSearch = (
    query: string,
    filter: "vendorName" | "invoiceNumber"
  ) => {
    setSearchQuery(query);
    setSearchFilter(filter);
  };

  const handleCreateInvoice = async (newInvoice: Partial<Invoice>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/invoices", newInvoice);
      setInvoices((prev) => [...prev, response.data]);
      toast.success("Successfully created !")
    } catch (error) {
      toast.error("Something went wrong !")
      console.error("Error creating invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInvoice = async (id: ObjectId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/invoices/${id}`);
      setInvoices((prev) => prev.filter((invoice) => invoice._id !== id));
      toast.success("Successfully deleted !");
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("Error deleting invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInvoice = async (updatedInvoice: Partial<Invoice>) => {
    try {
      setLoading(true);
      const id = updatedInvoice._id;
      const response = await axios.put(`/api/invoices/${id}`, updatedInvoice);
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice._id === updatedInvoice._id ? response.data : invoice
        )
      );
      toast.success("Successfully updated!");
    } catch (error) {
      toast.error("Something went wrong !");
      console.error("Error updating invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setUpdateModalOpen(true);
  };

  return (
    <div className="">
      <Header />
      <Navbar
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <div className="flex justify-between pt-5 px-7 mr-10">
        <Searchbar onSearch={handleSearch} />
        <button
          onClick={() => setModalOpen(true)}
          className="px-7 py-1 bg-sky-900 text-white rounded-lg hover:bg-sky-700 font-semibold"
        >
          Actions
          <ExpandMoreIcon className="h-4 w-4 font-semibold ml-2" />
        </button>
      </div>
      {/* Invoice Table */}
      <div className="bg-white rounded-lg shadow mt-5 px-3">
        <InvoiceTable
          invoices={filteredInvoices}
          loading={loading}
          onDelete={handleDeleteInvoice}
          //@ts-ignore
          onUpdate={handleUpdateClick}
        />
      </div>

      <CreateInvoiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateInvoice}
      />
      <UpdateInvoiceModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateInvoice}
        invoice={selectedInvoice}
      />
    </div>
  );
}
