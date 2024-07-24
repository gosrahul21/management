import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../../widgets/Spinner";
import GymPanel from "../../components/Gympanel";
import moment from "moment";
import { createSubscription } from "../../service/subscriptions/addSubscription";
import { getGroups } from "../../service/group/groupService";
import Group from "../group/types/Group";
import SubscriptionPlan from "../../service/subscription-plan/types/SubscriptionPlan";
import getSubscriptionPlans from "../../service/subscription-plan/getSubscriptionPlan";

const AddSubscriptionPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [coupon, setCoupon] = useState("");
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);

  const { gymId, memberId } = useParams();

  useEffect(() => {
    if (!(gymId && memberId)) return;

    const fetchPlansAndGroups = async () => {
      try {
        setLoading(true);
        const plans = await getSubscriptionPlans(gymId!);
        const groups = await getGroups(gymId);
        setPlans(plans);
        setGroups(groups);
        console.log({
          plans,
          groups,
        });
      } catch (error) {
        console.error("Error fetching plans and groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlansAndGroups();
  }, [gymId, memberId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createSubscription({
        memberId: memberId!,
        groupId: selectedGroup?._id || "",
        planId: selectedPlan?._id || "",
        startDate,
      });
      console.log("Subscription added:", response.data);
      navigate(`/user/${userId}`);
    } catch (error) {
      console.error("Error adding subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <GymPanel>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-white text-center">
            Add Subscription
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
                  <option
                    className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                    key={plan._id}
                    value={plan._id}
                  >
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
                  <option
                    className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                    key={group._id}
                    value={group._id}
                  >
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
                htmlFor="paymentInfo"
                className="block text-lg font-medium mb-2 text-white"
              >
                Subscription Information
              </label>
              <div
                id="paymentInfo"
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              >
                {selectedPlan && (
                  <div className="mb-2 text-white">
                    <p>Price: ${selectedPlan.price}</p>
                    <p>Duration: {selectedPlan.durationInDays} days</p>
                  </div>
                )}

                {selectedGroup && (
                  <div className="mb-4 text-white">
                    <p className="font-bold">Timing</p>
                    <p> {selectedGroup.startTime} - {selectedGroup.endTime}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="coupon"
                className="block text-lg font-medium mb-2 text-white"
              >
                Coupon Code (optional)
              </label>
              <input
                type="text"
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
              Add Subscription
            </button>
          </form>
        </div>
      </div>
    </GymPanel>
  );
};

export default AddSubscriptionPage;
