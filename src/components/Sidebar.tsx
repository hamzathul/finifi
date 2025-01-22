"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <ExploreOutlinedIcon className="mr-5" />,
    },
    {
      name: "Invoices",
      href: "/",
      icon: <InsertDriveFileOutlinedIcon className="mr-5" />,
    },
    {
      name: "Vendors",
      href: "/vendors",
      icon: <PersonOutlineOutlinedIcon className="mr-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SettingsIcon className="mr-5" />,
    },
  ];

  return (
    <div className=" sticky top-0 shadow-md h-screen bg-cyan-50/30">
      <div>
        {/* Logo Section */}
        <div className="p-6">
          <Image src="/f2.png" alt="finifi logo" width={120} height={150} />
        </div>

        {/* Navigation Section */}
        <nav className="ml-10 mt-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.href)} // Update active link on click
                  className={`text-xl text-sky-900 block py-2 px-4 rounded-l-full ${
                    activeLink === link.href
                      ? "!text-white bg-sky-900"
                      : "hover:bg-cyan-200"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
