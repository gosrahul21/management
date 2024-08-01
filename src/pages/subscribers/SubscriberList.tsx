import moment from "moment"; // Import moment for date manipulation
import GymPanel from "../../components/Gympanel";
import SearchIcon from "../../assets/icons/search-icon.svg";
import WhatsappIcon from "../../assets/icons/whatsapp-icon.svg";
import SubscriberForm from "../../components/SubscriberForm";
import Modal from "../../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useSubscribers } from "./hooks/userSubscribers";

const SubscriberList = () => {
  const {
    subscribers,
    filter,
    planFilter,
    searchTerm,
    setFilter,
    setPlanFilter,
    setSearchTerm,
    sendMessageOnWhatsApp,
    isAddEditFormOpen,
    initialSubscriberData,
    createGymSubscriber,
    closeAddEditForm,
    openAddEditForm,
    subscriptions
  } = useSubscribers();
  const { gymId } = useParams();
  const navigate = useNavigate();

  return (
    <GymPanel>
      <div className="p-6">
        <div className="p-4 rounded-lg mb-6 flex flex-col md:flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Subscribers</h1>
          <button
            onClick={() => openAddEditForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
          >
            Add Subscriber
          </button>
        </div>

        <Modal
          isOpen={isAddEditFormOpen}
          onClose={closeAddEditForm}
          title={
            isAddEditFormOpen && initialSubscriberData
              ? "Edit Subscriber"
              : "Add Subscriber"
          }
        >
          <SubscriberForm onAddSubscriberClick={createGymSubscriber} />
        </Modal>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded ${
                filter === "all" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("subscribed")}
              className={`px-4 py-2 rounded ${
                filter === "subscribed" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              Subscribed
            </button>
            <button
              onClick={() => setFilter("expired")}
              className={`px-4 py-2 rounded ${
                filter === "expired" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              Expired
            </button>
            <button
              onClick={() => setFilter("expiring_soon")}
              className={`px-4 py-2 rounded ${
                filter === "expiring_soon" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              Expiring Soon
            </button>
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="all">All Plans</option>
            {subscriptions.map((subs) => (
              <option key={subs.planName}>{subs.planName}</option>
            ))}
          </select>
          <div className="flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by member name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-l-md w-full md:w-auto focus:outline-none"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
              <img src={SearchIcon} alt="Search Icon" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Subscribers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscribers.map((subscriber) => {
            const startDate = subscriber.activeSubscriptions?.startDate;
            const durationInDays = subscriber.activeSubscriptions?.planId?.durationInDays;
            const endDate = moment(new Date(startDate)).add(durationInDays, "days");
            const daysLeft = endDate.diff(moment(), "days");

            console.log({
              daysLeft,
              durationInDays: subscriber.activeSubscriptions,
            });

            const isExpired = daysLeft < 0;
            return (
              <div
                key={subscriber._id}
                onClick={() =>
                  navigate(
                    `/gym/${gymId}/subscriber/profile/${subscriber?._id}`
                  )
                }
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex space-x-2 flex-row items-start"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URI}/image/${subscriber?.userId?.image}`}
                  alt={`profile`}
                  className="w-20 h-20 rounded-full mb-4 md:mb-0 md:mr-4 object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {subscriber?.userId?.firstName +
                      " " +
                      subscriber?.userId?.lastName}
                  </h2>
                  <p className="text-gray-400">{subscriber?.userId?.email}</p>
                  <p className="text-gray-400">{subscriber?.userId?.phoneNo}</p>
                  <p className="mt-2 text-gray-300">
                    Plan: {subscriber.activeSubscriptions?.planId?.planName || 'NA'}
                  </p>
                  <p
                    className={`mt-1 ${
                      isExpired ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {subscriber?.activeSubscriptions
                      ? isExpired
                        ? "Expired"
                        : `${daysLeft} days left`
                      : "New Member"}
                  </p>
                  {(!subscriber.activeSubscriptions || isExpired) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/gym/${gymId}/add-subscription/${subscriber._id}`
                        );
                      }}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded"
                    >
                      {isExpired ? "Renew Plan" : "Add Plan"}
                    </button>
                  )}
                </div>
                <div className="flex justify-end w-full md:w-auto">
                  <img
                    src={WhatsappIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendMessageOnWhatsApp(subscriber);
                    }}
                    className="h-10 w-10 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GymPanel>
  );
};

export default SubscriberList;
