import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubscriptionPlan from "../../../service/subscription-plan/types/SubscriptionPlan";
import getSubscriptionPlans from "../../../service/subscription-plan/getSubscriptionPlan";
import createSubscriptionPlan from "../../../service/subscription-plan/createSubscriptionPlan";
import updateSubscriptionPlan from "../../../service/subscription-plan/updateSubscriptionPlan";
import deleteSubscriptionPlan from "../../../service/subscription-plan/deleteSubscriptionPlan";

const useSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [isAddEditFormOpen, setIsAddEditFormOpen] = useState<any>(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionPlan>();
  const { gymId } = useParams();

  useEffect(() => {
    fetchSubscriptionPlans();
  }, [gymId]);

  const fetchSubscriptionPlans = async () => {
    try {
      const plans = await getSubscriptionPlans(gymId!);
      setSubscriptions(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
    }
  };

  const createSubscription = async (subscriptionData: any) => {
    try {
      await createSubscriptionPlan({
        gymId,
        ...subscriptionData,
      });
      fetchSubscriptionPlans(); // Refresh the list after creating
      closeAddEditForm();
    } catch (error) {
      console.error("Error creating subscription plan:", error);
    }
  };

  const updateSubscription = async (
    subscriptionId: string,
    updateData: any
  ) => {
    try {
      const updatedsubscription = await updateSubscriptionPlan(
        subscriptionId,
        updateData
      );
      setSubscriptions(
        subscriptions.map((subscription) =>
          subscription._id === subscriptionId
            ? { ...subscription, ...updatedsubscription }
            : subscription
        )
      );
      closeAddEditForm();
    } catch (error) {
      console.error("Error updating subscription plan:", error);
    }
  };

  const deleteSubscription = async () => {
    try {
      await deleteSubscriptionPlan(selectedSubscription?._id!);
      closeAddEditForm();
      setSubscriptions(
        subscriptions.filter(
          (subscription) => subscription._id !== selectedSubscription?._id
        )
      );
    } catch (error) {
      console.error("Error deleting subscription plan:", error);
    }
  };

  const openAddEditForm = (subscription?: SubscriptionPlan) => {
    setSelectedSubscription(subscription);
    setIsAddEditFormOpen(true);
  };

  const closeAddEditForm = () => {
    setSelectedSubscription(undefined);
    setIsAddEditFormOpen(false);
  };

  const handleEditSubscription = (data: any) => {
    if (selectedSubscription) {
      updateSubscription(selectedSubscription?._id, data);
    } else {
      createSubscription(data);
    }
  };

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription?.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    subscriptions: filteredSubscriptions,
    isAddEditFormOpen,
    selectedSubscription,
    openAddEditForm,
    closeAddEditForm,
    searchTerm,
    setSearchTerm,
    handleEditSubscription,
    deleteSubscription,
  };
};

export default useSubscription;
