import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Member } from "../types/Subscribers";
import { CreateMemberDTO } from "../types/CreateSubscribersDto";
import { createMember } from "../../../service/susbcriber/createMember";
import {
  getMembersByGym,
  updateMember,
} from "../../../service/subscriptions/addSubscription";
import { enqueueSnackbar } from "notistack";
import useSubscription from "../../susbcription-page/hooks/useSubscription";
import moment from "moment";

export const useSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [initialSubscriberData, setInitialSubscriberData] = useState<Member | undefined>(undefined);
  const [isAddEditFormOpen, setIsAddEditFormOpen] = useState<boolean>(false);
  const { gymId } = useParams<{ gymId: string }>();
  const { subscriptions } = useSubscription();

  useEffect(() => {
    if (!gymId) return;
    fetchSubscribers();
  }, [gymId]);

  const fetchSubscribers = useCallback(async () => {
    try {
      const data = await getMembersByGym(gymId!);
      setSubscribers(data);
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
    }
  }, [gymId]);

  const createGymSubscriber = async (body: any) => {
    try {
      const subscriber = await createMember({ gymId, ...body });
      enqueueSnackbar("New member is added");

      setSubscribers([subscriber, ...subscribers]);
      closeAddEditForm();
    } catch (error) {
      console.error("Error occurred while creating subscriber", error);
    }
  };

  const updateGymSubscriber = async (subscriberId: string, updateSubscriberDto: Partial<CreateMemberDTO>) => {
    try {
      const updatedSubscriber = await updateMember(subscriberId, updateSubscriberDto);
      enqueueSnackbar("Subscriber added successfully");
      setSubscribers(subscribers.map((subscriber) =>
        subscriber._id === subscriberId ? updatedSubscriber : subscriber
      ));
      closeAddEditForm();
    } catch (error) {
      console.error("Error occurred while updating subscriber", error);
    }
  };

  const filterSubscribers = () => {
    const currentDate = moment();
    return subscribers.filter((subscriber) => {
      const startDate = subscriber.activeSubscriptions?.startDate;
      const durationInDays = subscriber.activeSubscriptions?.planId?.durationInDays;
      const endDate = moment(new Date(startDate)).add(durationInDays, "days");
      const daysLeft = endDate.diff(currentDate, "days");
      const isExpired = daysLeft < 0;
      const isExpiringSoon = daysLeft <= 3 && daysLeft >= 0;

      let passesFilter = true;

      if (filter === "subscribed") passesFilter = !isExpired;
      if (filter === "expired") passesFilter = isExpired;
      if (filter === "expiring_soon") passesFilter = isExpiringSoon;
      if (planFilter !== "all") passesFilter = passesFilter && subscriber.activeSubscriptions?.planId?.planName === planFilter;
      if (!(subscriber.userId.firstName + " " + subscriber.userId.lastName).toLowerCase().includes(searchTerm.toLowerCase())) passesFilter = false;

      return passesFilter;
    });
  };

  const sendMessageOnWhatsApp = (subscriber: Member) => {
    const phoneNumber = subscriber?.userId?.phoneNo?.replace(/[^0-9]/g, ""); // Ensure phone number is digits only
    const message = `Hello ${subscriber.userId.firstName},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const filteredSubscribers = filterSubscribers();

  const handleFilterChange = (newFilter: string) => setFilter(newFilter);
  const handlePlanFilterChange = (newPlanFilter: string) => setPlanFilter(newPlanFilter);
  const handleSearchTermChange = (newSearchTerm: string) => setSearchTerm(newSearchTerm);

  const openAddEditForm = (subscriber?: Member) => {
    setInitialSubscriberData(subscriber);
    setIsAddEditFormOpen(true);
  };

  const closeAddEditForm = () => {
    setInitialSubscriberData(undefined);
    setIsAddEditFormOpen(false);
  };

  return {
    subscribers: filteredSubscribers,
    filter,
    planFilter,
    searchTerm,
    setFilter: handleFilterChange,
    setPlanFilter: handlePlanFilterChange,
    setSearchTerm: handleSearchTermChange,
    sendMessageOnWhatsApp,
    openAddEditForm,
    closeAddEditForm,
    createGymSubscriber,
    updateGymSubscriber,
    isAddEditFormOpen,
    initialSubscriberData,
    subscriptions
  };
};
