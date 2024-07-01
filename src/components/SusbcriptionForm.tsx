import React, { useState } from "react";
import Input from "../widgets/Input";

const SubscriptionForm = () => {
  const [subscriptionName, setSubscriptionName] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [pricing, setPricing] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription addition logic here
    const newSubscription = {
      name: subscriptionName,
      durationDays: parseInt(durationDays),
      pricing: parseFloat(pricing),
    };
    console.log(newSubscription);
    // You can implement API calls or state management logic here to save the subscription
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded shadow-md text-white"
    >
      <h2 className="text-2xl mb-4">Add Subscription</h2>
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
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Add Subscription
      </button>
    </form>
  );
};

export default SubscriptionForm;
