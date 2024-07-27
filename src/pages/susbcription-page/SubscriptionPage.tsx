import { useNavigate } from "react-router-dom";
import GymPanel from "../../components/Gympanel";
import SearchIcon from "../../assets/icons/search-icon.svg";
// import Subscriptions from '../config/subscriptions'; // Replace with actual subscription data import
import Modal from "../../components/Modal";
import SubscriptionForm from "../../components/SusbcriptionForm";
import EditIcon from "../../components/EditIcon"; // Import EditIcon component
import useSubscription from "./hooks/useSubscription";

const SubscriptionList = () => {
  const navigate = useNavigate();
  const {
    subscriptions,
    isAddEditFormOpen,
    closeAddEditForm,
    handleEditSubscription,
    selectedSubscription,
    openAddEditForm,
    searchTerm,
    deleteSubscription,
    setSearchTerm,
  } = useSubscription();

  return (
    <GymPanel>
      <div className="p-6">
        <Modal
          isOpen={isAddEditFormOpen}
          onClose={closeAddEditForm}
          title={
            selectedSubscription ? "Edit Subscription" : "Add Subscription"
          }
        >
          <SubscriptionForm
            onSubmit={handleEditSubscription}
            onDelete={deleteSubscription}
            selectedSusbcription={selectedSubscription}
          />
        </Modal>
        <div className="md:p-4 p-0 rounded-lg mb-6 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between md:items-center">
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <button
            onClick={() => openAddEditForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 md:py-2 md:px-4 rounded"
          >
            Add Subscription
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by subscription name."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-full md:w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Subscriptions List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription?._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start justify-between cursor-pointer"
              onClick={() =>{}
                // navigate(`/subscription/profile/${subscription?._id}`)
              }
            >
              <div>
                <h2 className="text-xl font-bold">{subscription.planName}</h2>
                <p className="text-gray-400">Price: {subscription.price}</p>
              </div>
              <EditIcon
                onClick={(e: any) => {
                  e.stopPropagation();
                  openAddEditForm(subscription);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default SubscriptionList;
