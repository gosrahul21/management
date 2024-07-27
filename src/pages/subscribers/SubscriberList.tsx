import moment from "moment"; // Import moment for date manipulation
import GymPanel from "../../components/Gympanel";
import SearchIcon from "../../assets/icons/search-icon.svg";
import WhatsappIcon from "../../assets/icons/whatsapp-icon.svg";
import { useSubscribers } from "./hooks/userSubscribers";
import SubscriberForm from "../../components/SubscriberForm";
import Modal from "../../components/Modal";
import { useNavigate, useParams } from "react-router-dom";

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
  } = useSubscribers();
  const { gymId } = useParams();

  const navigate = useNavigate();
  return (
    <GymPanel>
      <div className="p-6">
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Subscribers</h1>
          <button
            onClick={() => openAddEditForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
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
          <SubscriberForm onAddSusbcriberClick={createGymSubscriber} />
        </Modal>

        {/* Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <button
              onClick={() => setFilter("all")}
              className={`mx-2 px-4 py-2 rounded ${
                filter === "all" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("subscribed")}
              className={`mx-2 px-4 py-2 rounded ${
                filter === "subscribed" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              Subscribed
            </button>
            <button
              onClick={() => setFilter("expired")}
              className={`mx-2 px-4 py-2 rounded ${
                filter === "expired" ? "bg-blue-600" : "bg-gray-700"
              } hover:bg-blue-700`}
            >
              Expired
            </button>
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="all">All Plans</option>
            <option value="Premium Membership">Premium Membership</option>
            <option value="Basic Membership">Basic Membership</option>
            <option value="Standard Membership">Standard Membership</option>
          </select>
          <div className="flex items-center flex-1 px-6">
            <input
              type="text"
              placeholder="Search by member name."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
              <img src={SearchIcon} alt="Search Icon" />
            </button>
          </div>
        </div>

        {/* Subscribers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscribers.map((subscriber) => {
            const startDate = subscriber.activeSubscriptions?.startDate;
            const durationInDays =
              subscriber.activeSubscriptions?.planId?.durationInDays;

            const endDate = moment(new Date(startDate)).add(
              durationInDays,
              "days"
            );
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
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start"
              >
                <img
                  src={`http://localhost:3000/image/${subscriber.userId?.image}`}
                  alt={` profile`}
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {subscriber.userId.firstName +
                      " " +
                      subscriber.userId.lastName}
                  </h2>
                  <p className="text-gray-400">{subscriber.userId.email}</p>
                  <p className="text-gray-400">{subscriber.userId.phoneNo}</p>
                  <p className="mt-2 text-gray-300">
                    Plan: {subscriber.activeSubscriptions?.planId?.planName}
                  </p>
                  <p
                    className={`mt-1 ${
                      isExpired ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {/* {isExpired ? "Expired" : `${daysLeft} days left`} */}
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
                <div className="flex-1 flex justify-end">
                  <img
                    src={WhatsappIcon}
                    onClick={() => sendMessageOnWhatsApp(subscriber)}
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
