import { InvoiceStatus } from '@/types/invoice';
import React from 'react'

interface NavbarProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selectedStatus, onStatusChange }) => {

     const statuses: ("All" | InvoiceStatus)[] = [
       "All",
       "Open",
       "Awaiting Approval",
       "Approved",
       "Processing",
       "Paid",
       "Rejected",
       "Vendor not found",
       "Duplicate",
       "Void",
     ];

  return (
    <div className="border-b border-gray-200 pt-4 px-5">
      <ul className="flex justify-between space-x-6">
        {statuses.map((status) => (
          <li
            key={status}
            onClick={() => onStatusChange(status)}
            className={`cursor-pointer pb-2 ${
              status === selectedStatus
                ? "border-b-4 border-sky-900 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar