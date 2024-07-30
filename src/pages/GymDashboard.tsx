import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Legend } from "chart.js";
import { chartColors } from "../utils/color";
import GymPanel from "../components/Gympanel";
import {
  FaUser,
  FaDollarSign,
  FaQuestionCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getMembersDashboard } from "../service/susbcriber/getMemberDashboard";
import getTotalRevenue from "../service/revenue/getTotalRevue";
import { getExpenses } from "../service/expense/getExpense";
import { getTotalEnquiries } from "../service/enquiries/getTotalEnquiries";

Chart.register(ArcElement, Legend, Tooltip);

const GymDashboard = () => {
  const [gymDetails, setGymDetails] = useState<any>({
    totalClients: 500,
    activeClients: 350,
    newClients: 50,
    totalEmployees: 25,
    totalTrainers: 10,
    totalEnquiries: 120,
    newEnquiries: 30,
    expiringMemberships: 20,
    revenueThisYear: 150000,
    expensesThisYear: 60000,
    revenueThisMonth: 15000,
    expensesThisMonth: 5000,
  });
  const { gymId } = useParams();

  // Mock Data
  // const gymDetails = {
  //   totalClients: 500,
  //   activeClients: 350,
  //   newClients: 50,
  //   totalEmployees: 25,
  //   totalTrainers: 10,
  //   totalEnquiries: 120,
  //   newEnquiries: 30,
  //   expiringMemberships: 20,
  //   revenueThisYear: 150000,
  //   expensesThisYear: 60000,
  //   revenueThisMonth: 15000,
  //   expensesThisMonth: 5000,
  // };

  useEffect(() => {
    if (!gymId) return;
    fetchMemberDashboard();
  }, [gymId]);

  const fetchMemberDashboard = async () => {
    const memberDashBoardData = await getMembersDashboard(gymId!);
    const today = new Date();
    const thisYear = today.getFullYear();

    const fromDate = new Date(thisYear, 0, 1); // January 1st of this year
    const toDate = new Date(thisYear, 11, 31); // December 31
    const getRevenue = await getTotalRevenue(gymId!, fromDate, toDate);
    const expenses = await getExpenses(gymId!, fromDate, toDate);
    const totalEnquiries = await getTotalEnquiries(gymId!, fromDate, toDate);
    setGymDetails({
      ...gymDetails,
      ...memberDashBoardData,
      revenueThisYear: getRevenue.revenue,
      expiringMemberships: memberDashBoardData.membershipExpiring,
      expensesThisYear: expenses.totalExpenses,
      ...totalEnquiries,
    });
  };

  const commonOptions = {
    cutout: "50%",
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        color: "white",
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const memberData = {
    labels: ["Active Clients", "Inactive Clients"],
    datasets: [
      {
        data: [
          gymDetails.activeClients,
          gymDetails.totalClients - gymDetails.activeClients,
        ],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
        borderWidth: 0,
      },
    ],
  };

  const enquiryData = {
    labels: ["New Enquiries", "Total Enquiries"],
    datasets: [
      {
        data: [
          gymDetails.newEnquiries,
          gymDetails.totalEnquiries - gymDetails.newEnquiries,
        ],
        backgroundColor: ["#4CAF50", "#FF5252"],
        hoverBackgroundColor: ["#4CAF50", "#FF5252"],
        borderWidth: 0,
      },
    ],
  };

  // const revenueExpenseData = {
  //   labels: ["Revenue", "Expenses"],
  //   datasets: [
  //     {
  //       data: [gymDetails.revenueThisMonth, gymDetails.expensesThisMonth],
  //       backgroundColor: ["#4CAF50", "#FF5252"],
  //       hoverBackgroundColor: ["#4CAF50", "#FF5252"],
  //       borderWidth: 0,
  //     },
  //   ],
  // };

  return (
    <GymPanel>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaUser className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Total Clients
              </h2>
              <p className="text-4xl font-semibold text-center">
                {gymDetails.totalClients}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Active Clients
            </h2>
            <div className="mx-auto  flex justify-center items-center flex-col">
              <div className="h-[200px] w-[200px]">
                <Doughnut
                  data={memberData}
                  height={"50%"}
                  options={commonOptions as any}
                />
              </div>
              <div className="py-1">
                <div className="flex gap-2">
                  <div className="h-4 w-10 bg-[#3399FF]"></div>
                  <p className="text-bold">Active clients: {gymDetails.activeClients}</p>
                </div>

                <div className="flex gap-2">
                  <div className="h-4 w-10 bg-[#CCCC66]"></div>
                  <p>
                    InActive Clients:{" "}
                    {gymDetails.totalClients - gymDetails.activeClients}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaUser className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Active Clients
              </h2>
              <p className="text-4xl font-semibold text-center">
                {gymDetails.activeClients}
              </p>
            </div>
          </div> */}

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaUser className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                New Clients
              </h2>
              <p className="text-4xl font-semibold text-center">
                {gymDetails.newClients}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaUser className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Total Employees
              </h2>
              <p className="text-4xl font-semibold text-center">
                {gymDetails.totalEmployees}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaExclamationCircle className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Memberships Expiring
              </h2>
              <p className="text-4xl font-semibold text-center">
                {gymDetails.expiringMemberships}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaDollarSign className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Revenue This Year
              </h2>
              <p className="text-4xl font-semibold text-center">
                ${gymDetails.revenueThisYear}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaDollarSign className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                Expenses This Year
              </h2>
              <p className="text-4xl font-semibold text-center">
                ${gymDetails.expensesThisYear}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Total Enquiries
            </h2>
            <div className="h-[200px] w-[200px] mx-auto relative">
              <Doughnut data={enquiryData} options={commonOptions as any} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center">
                  {/* New: {gymDetails.newEnquiries} */}
                  <br />
                  {/* Total: {gymDetails.totalEnquiries} */}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaQuestionCircle className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                New Enquiries
              </h2>
              <p className="text-4xl font-semibold text-center">
                {/* {gymDetails.newEnquiries} */}
              </p>
            </div>
          </div>

          {/* <div className="bg-gray-800 p-4 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2 text-center">
              This Month's Revenue
            </h2>
            <div className="h-[200px] w-[200px] mx-auto relative">
              <Doughnut data={revenueExpenseData} options={commonOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center">
                  Revenue: ${gymDetails.revenueThisMonth}
                  <br />
                  Expenses: ${gymDetails.expensesThisMonth}
                </p>
              </div>
            </div>
          </div> */}

          {/* <div className="bg-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
            <FaDollarSign className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                This Month's Expenses
              </h2>
              <p className="text-4xl font-semibold text-center">
                ${gymDetails.expensesThisMonth}
              </p>
            </div>
          </div> */}

          {/* <div
            onClick={() => navigate("/details")}
            className="bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer flex items-center justify-center"
          >
            <FaChartPie className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                More Details
              </h2>
              <p className="text-lg text-gray-400 text-center">
                Click here for more details
              </p>
            </div>
          </div> */}
        </section>
      </main>
    </GymPanel>
  );
};

export default GymDashboard;
