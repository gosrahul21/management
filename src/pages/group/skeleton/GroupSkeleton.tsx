import { useGroup } from "../hooks/useGroup";
import AddGroupForm from "../../../components/AddGroupForm";
import Modal from "../../../components/Modal";
import GymPanel from "../../../components/Gympanel";
import SearchIcon from "../../../assets/icons/search-icon.svg";

const GroupListSkeleton = () => {
  const {
    isAddEditFormOpen,
    handleEditExpense,
    createGymGroup,
    openAddEditForm,
    searchTerm,
    setSearchTerm,
    deleteGymGroup,
    initialGroupData,
    updateGymGroup,
  } = useGroup();


  return (
    <GymPanel>
      <div className="p-6">
        <Modal
          isOpen={isAddEditFormOpen}
          onClose={handleEditExpense}
          title={
            isAddEditFormOpen && initialGroupData ? "Edit Group" : "Add Group"
          }
        >
          <AddGroupForm
            initialGroupData={initialGroupData}
            onFormSubmit={
              initialGroupData
                ? (formData) => updateGymGroup(initialGroupData._id, formData)
                : createGymGroup
            }
            onDelete={deleteGymGroup}
          />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Groups</h1>
          <button
            onClick={() => openAddEditForm(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Group
          </button>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by group name."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className=" bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start justify-between"
            >
              <div>
                <div className="h-6 bg-gray-600 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 w-1/3"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 w-1/4"></div>
              </div>
              <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default GroupListSkeleton;
