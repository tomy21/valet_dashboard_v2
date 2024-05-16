import React, { useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left text-xs">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex gap-2 justify-center items-center w-full px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none text-xs"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          Export
          <HiOutlineDownload />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 min-w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 text-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Report in/out
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Report duration
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Report payment
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
