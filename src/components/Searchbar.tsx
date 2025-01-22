import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type SearchFilter = "vendorName" | "invoiceNumber";

interface SearchBarProps {
  onSearch: (query: string, filter: SearchFilter) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<SearchFilter>("vendorName");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query, searchFilter);
  };

  const handleFilterChange = (filter: SearchFilter) => {
    setSearchFilter(filter);
    setIsFilterDropdownOpen(false);
    onSearch(searchQuery, filter);
  };

  return (
    <div className="flex-1 max-w-sm pt-5 px-3">
      <div className="flex border rounded-lg">
        {/* Search Filter Dropdown */}
        <div className="relative">
          <button
            className="flex items-center px-4 py-2 border rounded-l-lg bg-gray-50"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            <SearchOutlinedIcon className="mr-1 h-5 w-5" />

            <span className="mr-2 font-semibold">
              {searchFilter === "vendorName" ? "by vendor" : "by invoice"}
            </span>
            <ExpandMoreIcon className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {isFilterDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => handleFilterChange("vendorName")}
              >
                by vendor
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => handleFilterChange("invoiceNumber")}
              >
                by invoice
              </button>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            // placeholder={
            //   searchFilter === "vendorName"
            //     ? "Search by vendor name..."
            //     : "Search by invoice number..."
            // }
            className="pl-3 pr-4 py-2 w-full border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
