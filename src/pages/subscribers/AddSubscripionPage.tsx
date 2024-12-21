import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GymPanel from "../../components/Gympanel";
import moment from "moment";
import { getGroups } from "../../service/group/groupService";
import Group from "../group/types/Group";
import SubscriptionPlan from "../../service/subscription-plan/types/SubscriptionPlan";
import getSubscriptionPlans from "../../service/subscription-plan/getSubscriptionPlan";
import { enqueueSnackbar } from "notistack";
import {
  createSubscription,
  updateSubscription,
} from "../../service/subscriptions/addSubscription";
import { getSubscriptionById } from "../../service/subscriptions/getSusbcription";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

const AddOrUpdateSubscriptionPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [coupon, setCoupon] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [holdDates, setHoldDates] = useState<
    { pauseDate: string; restartDate: string }[]
  >([]);
  const [_loading, setLoading] = useState<boolean>(false);

  const { gymId, memberId, subscriptionId } = useParams();

  useEffect(() => {
    if (!gymId || !memberId) return;

    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const [plans, groups, subscription] = await Promise.all([
          getSubscriptionPlans(gymId!),
          getGroups(gymId),
          subscriptionId ? getSubscriptionById(subscriptionId) : null,
        ]);

        setPlans(plans);
        setGroups(groups);

        if (subscription) {
          setSelectedPlan(
            plans.find((plan) => plan._id === subscription.planId._id) || null
          );
          setSelectedGroup(
            groups.find((group: any) => group._id === subscription.groupId) ||
              null
          );
          setStartDate(moment(subscription.startDate).format("YYYY-MM-DD"));
          setHoldDates(
            subscription.holdDate?.map((hold: any) => ({
              pauseDate: moment(hold.pauseDate).format("YYYY-MM-DD"),
              restartDate: moment(hold.restartDate).format("YYYY-MM-DD"),
            })) || []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [gymId, memberId, subscriptionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        memberId: memberId!,
        groupId: selectedGroup?._id || "",
        planId: selectedPlan?._id || "",
        startDate,
        holdDate: holdDates,
      };

      if (subscriptionId) {
        await updateSubscription(subscriptionId, payload);
        enqueueSnackbar("Subscription updated successfully", {
          variant: "success",
        });
      } else {
        await createSubscription(payload);
        enqueueSnackbar("New subscription added", { variant: "success" });
      }

      navigate(`/gym/${gymId}/subscribers`);
    } catch (error: any) {
      console.error("Error saving subscription:", error.response);
      enqueueSnackbar(
        error?.response?.data?.message || "Error saving subscription:",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleHoldDateChange = (
    index: number,
    field: "pauseDate" | "restartDate",
    value: string
  ) => {
    setHoldDates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addHoldDate = () => {
    setHoldDates((prev) => [...prev, { pauseDate: "", restartDate: "" }]);
  };

  const removeHoldDate = (index: number) => {
    setHoldDates((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <GymPanel>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">
            {subscriptionId ? "Update Subscription" : "Add Subscription"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="plan"
                className="block text-lg font-medium mb-2 text-white"
              >
                Select Plan
              </label>
              <select
                id="plan"
                value={selectedPlan?._id || ""}
                onChange={(e) =>
                  setSelectedPlan(
                    plans.find((plan) => plan._id === e.target.value) || null
                  )
                }
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              >
                <option value="">Select a plan</option>
                {plans.map((plan) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.planName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="group"
                className="block text-lg font-medium mb-2 text-white"
              >
                Select Group
              </label>
              <select
                id="group"
                value={selectedGroup?._id || ""}
                onChange={(e) =>
                  setSelectedGroup(
                    groups.find((group) => group._id === e.target.value) || null
                  )
                }
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              >
                <option value="">Select a group</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-lg font-medium mb-2 text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="holdDates"
                className="block text-lg font-medium mb-2 text-white"
              >
                Hold Dates
              </label>
              {holdDates.map((hold, index) => (
                <div key={index} className="mb-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={hold.pauseDate}
                      onChange={(e) =>
                        handleHoldDateChange(index, "pauseDate", e.target.value)
                      }
                      className="w-1/2 p-2 border border-gray-700 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="date"
                      value={hold.restartDate}
                      onChange={(e) =>
                        handleHoldDateChange(
                          index,
                          "restartDate",
                          e.target.value
                        )
                      }
                      className="w-1/2 p-2 border border-gray-700 rounded bg-gray-700 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeHoldDate(index)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
                    >
                      {/* Remove */}
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addHoldDate}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded mt-2"
              >
                Add Hold Date
              </button>
            </div>

            <div className="mb-4">
              <label
                htmlFor="coupon"
                className="block text-lg font-medium mb-2 text-white"
              >
                Coupon Code
              </label>
              <input
                type="text"
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                placeholder="Enter coupon code (optional)"
              />
            </div>

            <button
              type="submit"
              disabled={_loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              {_loading ? "Saving..." : subscriptionId ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </GymPanel>
  );
};

export default AddOrUpdateSubscriptionPage;
