import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Fetch mock data (Replace with API call if needed)
    const fetchData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(res.data);
    };
    fetchData();
  }, []);

  // Handle sorting
  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle search filtering
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-4 py-2 rounded-md w-64"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSort}>
          Sort {sortOrder === "asc" ? "↓" : "↑"}
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded-md"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}>
          Prev
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="bg-gray-300 px-4 py-2 rounded-md"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
