import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../App.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://algo-g8vo.onrender.com/api/auth/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      navigate("/signup");
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full relative">
      <h1 className="text-xl font-bold text-gray-700">Algoroot</h1>

      <div className="relative">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}>
          {user?.name} ({user?.email})
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">
              Delete Account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
