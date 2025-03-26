import { useState } from "react";
import { FaTachometerAlt, FaBars } from "react-icons/fa";
import "../App.css";

const Sidebar = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  return (
    <div
      className={`h-screen bg-white shadow-md ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 fixed md:relative`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2
          className={`text-xl font-bold text-gray-700 ${
            isCollapsed ? "hidden" : "block"
          }`}>
          Algoroot
        </h2>
        <button
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="p-4 space-y-3">
        <li
          className={`flex items-center p-3 rounded-md cursor-pointer ${
            activePage === "dashboard"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActivePage("dashboard")}>
          <FaTachometerAlt className="mr-3" />
          {!isCollapsed && "Dashboard"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
