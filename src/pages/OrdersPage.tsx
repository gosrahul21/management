import { useState } from "react";
import moment from "moment";
import GymPanel from "../components/Gympanel";

const OrdersPage = () => {
  const [filter, setFilter] = useState<any>("all");
  const [orders] = useState<any>([
    { id: "ORD001", date: "2023-06-10", status: "pending", total: 250.0 },
    { id: "ORD002", date: "2023-06-12", status: "completed", total: 150.0 },
    { id: "ORD003", date: "2023-06-14", status: "canceled", total: 100.0 },
    { id: "ORD004", date: "2023-06-16", status: "completed", total: 300.0 },
    { id: "ORD005", date: "2023-06-18", status: "pending", total: 200.0 },
  ]);

  const filteredOrders = orders.filter(
    (order: any) => filter === "all" || order.status === filter
  );

  return (
    <GymPanel>
      <header className="bg-gray-800 p-10 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
      </header>

      {/* Filter Section */}
      <div className="flex justify-between mb-6 px-10">
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
            onClick={() => setFilter("pending")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "pending" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-700`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "completed" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-700`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("canceled")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "canceled" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-700`}
          >
            Canceled
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="overflow-x-auto px-10 rounded-md">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order: any) => (
              <tr
                key={order.id}
                className="border-t border-gray-700 text-center hover:bg-gray-600"
              >
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{moment(order.date).format("LL")}</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GymPanel>
  );
};

export default OrdersPage;
