import { useState } from "react";
import Modal from "../components/Modal";
import LeaveForm from "../components/LeaveForm";
import { FaEdit, FaSort } from "react-icons/fa";
import Input from "../widgets/Input";
import GymPanel from "../components/Gympanel";

interface Leave {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

interface SortConfig {
  key: keyof Leave | null;
  direction: "ascending" | "descending";
}

const sampleLeaves: Leave[] = [
  {
    id: 1,
    name: "John Doe",
    startDate: "2024-06-01",
    endDate: "2024-06-05",
    type: "Sick Leave",
  },
  {
    id: 2,
    name: "Jane Smith",
    startDate: "2024-07-10",
    endDate: "2024-07-15",
    type: "Annual Leave",
  },
  {
    id: 3,
    name: "Sam Johnson",
    startDate: "2024-08-01",
    endDate: "2024-08-10",
    type: "Maternity Leave",
  },
  // Add more sample data as needed
];

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState<Leave[]>(sampleLeaves);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });

  const openForm = (leave: Leave | null) => {
    setEditingLeave(leave);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingLeave(null);
    setIsFormOpen(false);
  };

  const handleSaveLeave = (leave: Leave) => {
    if (editingLeave) {
      setLeaves(leaves.map((l) => (l.id === leave.id ? leave : l)));
    } else {
      setLeaves([...leaves, { ...leave, id: leaves.length + 1 }]);
    }
    closeForm();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: keyof Leave) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedLeaves = filteredLeaves.sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <GymPanel>
      <div className="p-6">
        <Modal
          isOpen={isFormOpen}
          onClose={closeForm}
          title={editingLeave ? "Edit Leave" : "Add Leave"}
        >
          <LeaveForm leave={editingLeave as any} onSave={handleSaveLeave as any} />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Leaves</h1>
          <button
            onClick={() => openForm(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Leave
          </button>
        </div>

        <div className="mb-6">
          <Input
            id="searchTerm"
            type="text"
            placeholder="Search by name or type..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-600">
                  Name
                  <FaSort
                    onClick={() => handleSort("name")}
                    className="inline ml-2 cursor-pointer"
                  />
                </th>
                <th className="py-2 px-4 border-b border-gray-600">
                  Start Date
                  <FaSort
                    onClick={() => handleSort("startDate")}
                    className="inline ml-2 cursor-pointer"
                  />
                </th>
                <th className="py-2 px-4 border-b border-gray-600">
                  End Date
                  <FaSort
                    onClick={() => handleSort("endDate")}
                    className="inline ml-2 cursor-pointer"
                  />
                </th>
                <th className="py-2 px-4 border-b border-gray-600">
                  Type
                  <FaSort
                    onClick={() => handleSort("type")}
                    className="inline ml-2 cursor-pointer"
                  />
                </th>
                <th className="py-2 px-4 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-600 text-center">
                    {leave.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600 text-center">
                    {leave.startDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600 text-center">
                    {leave.endDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600 text-center">
                    {leave.type}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-600 text-center">
                    <button
                      onClick={() => openForm(leave)}
                      className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GymPanel>
  );
};

export default ManageLeaves;
