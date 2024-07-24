import React, { useState, useEffect } from "react";
import Input from "../widgets/Input";
import { useGym } from "../context/GymContext";

const SubscriptionForm = ({ selectedSusbcription, onSubmit, onDelete }) => {
  const [subscriptionName, setSubscriptionName] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [pricing, setPricing] = useState("");
  const gymDetails = useGym();

  useEffect(() => {
    if (selectedSusbcription) {
      setSubscriptionName(selectedSusbcription.planName || "");
      setDurationDays(selectedSusbcription.durationInDays?.toString() || "");
      setPricing(selectedSusbcription.price || "");
    }
  }, [selectedSusbcription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      planName: subscriptionName,
      durationInDays: parseFloat(durationDays),
      price: pricing,
      gymId: gymDetails.gym._id,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded shadow-md text-white"
    >
      <label className="block mb-2">Subscription Name</label>
      <Input
        id="subscriptionName"
        type="text"
        value={subscriptionName}
        onChange={(e) => setSubscriptionName(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <label className="block mb-2">Duration in Days</label>
      <Input
        id="duration"
        type="number"
        value={durationDays}
        onChange={(e) => setDurationDays(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <label className="block mb-2">Pricing</label>
      <Input
        id="pricing"
        type="number"
        value={pricing}
        onChange={(e) => setPricing(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <div className="flex items-center">
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 mr-2"
        >
          {selectedSusbcription ? "Update Subscription" : "Add Subscription"}
        </button>
        {selectedSusbcription && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Delete Subscription
          </button>
        )}
      </div>
    </form>
  );
};

export default SubscriptionForm;
