import { useState, useEffect } from "react";
import GymPanel from "../components/Gympanel";
import SearchIcon from "../assets/icons/search-icon.svg";
import Modal from "../components/Modal";
import InquiryDetail from "../components/InquiryDetail";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState<Record<string, any>[]>([]);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<any>(false);
  const [sortBy] = useState<"asc" | "desc">("desc"); // Default sort by descending date
  const [currentPage, setCurrentPage] = useState<any>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Simulated fetch for inquiry data (replace with actual API call)
    const fetchInquiries = async () => {
      // Simulated data (at least 10 entries)
      const data = [
        {
          id: 1,
          name: "John Doe",
          phone: "123-456-7890",
          email: "john.doe@example.com",
          message: "I am interested in joining the gym.",
          date: "2024-06-01",
        },
        {
          id: 2,
          name: "Jane Smith",
          phone: "098-765-4321",
          email: "jane.smith@example.com",
          message: "Can I get a trial session?",
          date: "2024-06-02",
        },
        {
          id: 3,
          name: "Mike Johnson",
          phone: "456-789-0123",
          email: "mike.johnson@example.com",
          message: "Do you offer personal training?",
          date: "2024-06-03",
        },
        {
          id: 4,
          name: "Emily Brown",
          phone: "321-654-9876",
          email: "emily.brown@example.com",
          message: "What are your membership fees?",
          date: "2024-06-04",
        },
        {
          id: 5,
          name: "Chris Wilson",
          phone: "567-890-1234",
          email: "chris.wilson@example.com",
          message: "Are there any discounts for new members?",
          date: "2024-06-05",
        },
        {
          id: 6,
          name: "Sarah Thompson",
          phone: "789-012-3456",
          email: "sarah.thompson@example.com",
          message: "I have a question about your group classes.",
          date: "2024-06-06",
        },
        {
          id: 7,
          name: "David Lee",
          phone: "234-567-8901",
          email: "david.lee@example.com",
          message: "Can I schedule a tour of your facility?",
          date: "2024-06-07",
        },
        {
          id: 8,
          name: "Jessica Miller",
          phone: "678-901-2345",
          email: "jessica.miller@example.com",
          message: "Do you have a swimming pool?",
          date: "2024-06-08",
        },
        {
          id: 9,
          name: "Kevin Clark",
          phone: "901-234-5678",
          email: "kevin.clark@example.com",
          message: "What are your hours of operation?",
          date: "2024-06-09",
        },
        {
          id: 10,
          name: "Anna Scott",
          phone: "345-678-9012",
          email: "anna.scott@example.com",
          message: "Is there a minimum contract period for memberships?",
          date: "2024-06-10",
        },
      ];
      setInquiries(data);
    };

    fetchInquiries();
  }, []);

  const filterInquiries = () => {
    return inquiries.filter((inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredInquiries = filterInquiries();

  const openDetailModal = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedInquiry(null);
    setIsDetailModalOpen(false);
  };

  // const toggleSortOrder = () => {
  //   setSortBy(sortBy === "asc" ? "desc" : "asc");
  // };

  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === "asc" ? dateA - dateB : dateB - dateA;
  });

  const paginatedInquiries = sortedInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedInquiries.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <GymPanel>
      <div className="p-6">
        <Modal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          title={"Inquiry Details"}
        >
          <InquiryDetail inquiry={selectedInquiry} />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Inquiries</h1>
          <div className="flex items-center">
            {/* <div className="flex items-center mr-4">
              <span className="mr-2">Sort by Date:</span>
              <button onClick={toggleSortOrder} className="text-blue-600 hover:text-blue-700 focus:outline-none">
                {sortBy === 'asc' ? 'Ascending' : 'Descending'}
              </button>
            </div> */}
            {/* Add Inquiry Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Add Inquiry
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by name."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-700 text-left">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-700 text-left">
                  Phone Number
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-700 text-left">
                  Inquiry
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-700 text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedInquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="cursor-pointer hover:bg-gray-700"
                  onClick={() => openDetailModal(inquiry)}
                >
                  <td className="py-2 px-4 border-b border-gray-700">
                    {inquiry.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {inquiry.phone}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {inquiry.message}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    {inquiry.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </GymPanel>
  );
};

export default InquiryList;
