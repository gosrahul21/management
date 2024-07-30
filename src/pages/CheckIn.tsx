import { useState } from "react";

const CheckInKiosk = () => {
  const [memberId, setMemberId] = useState<any>("");
  const [message, setMessage] = useState<any>("");

  const handleCheckIn = async () => {
    // Replace with your API endpoint
    const response = await fetch("/api/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberId }),
    });

    if (response.ok) {
      setMessage("Check-in successful");
    } else {
      setMessage("Check-in failed");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-3xl mb-6">Member Check In</h2>
      <input
        type="text"
        placeholder="Enter Member ID"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
      />
      <button
        onClick={handleCheckIn}
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Check In
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default CheckInKiosk;
