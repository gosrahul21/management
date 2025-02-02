import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GymPanel from "../components/Gympanel";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subscriber, amount } = location.state;
  const [paymentMethod, setPaymentMethod] = useState<any>("creditCard");
  const [cardNumber, setCardNumber] = useState<any>("");
  const [expiryDate, setExpiryDate] = useState<any>("");
  const [cvc, setCvc] = useState<any>("");
  const [billingAddress, setBillingAddress] = useState<any>("");
  const [upiId, setUpiId] = useState<any>("");
  const [netbankingBank, setNetbankingBank] = useState<any>("");

  const handlePayment = (e: any) => {
    e.preventDefault();
    const paymentDetails = {
      paymentMethod,
      amount,
      subscriber,
      ...(paymentMethod === "creditCard" && {
        cardNumber,
        expiryDate,
        cvc,
        billingAddress,
      }),
      ...(paymentMethod === "upi" && { upiId }),
      ...(paymentMethod === "netbanking" && { netbankingBank }),
    };

    console.log(paymentDetails);

    // Simulating a successful payment and generating an order ID
    const orderId = "ORD123456"; // This would be generated by your backend in a real scenario

    navigate("/acknowledgement", {
      state: {
        orderId,
        orderDetails: { ...subscriber, amount },
      },
    });
  };

  return (
    <GymPanel>
      <header className="bg-gray-800 p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Payment Page</h1>
      </header>
      <div className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl mb-4">Subscriber Information</h2>
        <p>
          <strong>Name:</strong> {subscriber.name}
        </p>
        <p>
          <strong>Email:</strong> {subscriber.email}
        </p>
        <p>
          <strong>Phone:</strong> {subscriber.phone}
        </p>
        <p>
          <strong>Subscription Plan:</strong> {subscriber.subscriptionId}
        </p>

        <h2 className="text-2xl mt-6 mb-4">Payment Amount</h2>
        <p className="text-xl mb-4">Amount: ₹{amount}</p>

        <h2 className="text-2xl mt-6 mb-4">Payment Method</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block mb-2">Choose Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              required
            >
              <option value="creditCard">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Netbanking</option>
            </select>
          </div>

          {paymentMethod === "creditCard" && (
            <>
              <label className="block mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                required
              />

              <label className="block mb-2">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                placeholder="MM/YY"
                required
              />

              <label className="block mb-2">CVC</label>
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                required
              />

              <label className="block mb-2">Billing Address</label>
              <input
                type="text"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                required
              />
            </>
          )}

          {paymentMethod === "upi" && (
            <>
              <label className="block mb-2">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                required
              />
            </>
          )}

          {paymentMethod === "netbanking" && (
            <>
              <label className="block mb-2">Select Bank</label>
              <select
                value={netbankingBank}
                onChange={(e) => setNetbankingBank(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
                required
              >
                <option value="">Select Bank</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
                <option value="Kotak">Kotak Mahindra Bank</option>
                {/* Add more banks as needed */}
              </select>
            </>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </GymPanel>
  );
};

export default PaymentPage;
