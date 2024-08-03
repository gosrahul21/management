import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import QRCode from "react-qr-code";
import GymPanel from "../components/Gympanel";
import { useParams } from "react-router-dom";
import employees from "../config/employees";
import WhatsappIcon from "../assets/icons/whatsapp-icon.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const employee = employees.find((emp) => emp.id === parseInt(id!))!;

  // Mock data for visualizations
  const attendanceData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Attendance",
        data: [10, 12, 8, 15, 20, 18, 14, 22, 19, 23, 25, 30],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const sendMessageOnWhatsApp = () => {
    const phoneNumber = employee.phone.replace(/[^0-9]/g, ""); // Ensure phone number is digits only
    const message = `Hello ${employee.fullName},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <GymPanel>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <header className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-start items-center">
          <h1 className="text-3xl font-bold">Employee Details</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start">
            <img
              src={
                employee.profilePhoto || import.meta.env.VITE_DEFAULT_ALT_IMAGE
              }
              alt={`${employee.fullName}'s profile`}
              className="w-32 h-32 rounded-full object-cover mr-4 mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{employee.fullName}</h2>
              <p className="text-gray-400">{employee.email}</p>
              <p className="text-gray-400">{employee.phone}</p>
              <p className="text-gray-300">Username: {employee.username}</p>
              <p className="text-gray-300">
                DOB: {moment(employee.dob).format("LL")}
              </p>
              <p className="text-gray-300">Gender: {employee.gender}</p>
              <div className="flex">
                <img
                  src={WhatsappIcon}
                  className="h-8 w-8 cursor-pointer"
                  onClick={sendMessageOnWhatsApp}
                  alt="Send WhatsApp Message"
                />
              </div>
            </div>
            <div className="ml-auto">
              <QRCode
                value={employee.username}
                size={64}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Employment Information</h3>
            <div>
              <p className="text-gray-300">Position: {employee.position}</p>
              {/* <p className="text-gray-300">Department: {employee.department}</p> */}
              <p
                className={`text-lg ${
                  employee.status === "Active"
                    ? "text-green-400"
                    : "text-red-500"
                }`}
              >
                Status: {employee.status}
              </p>
              <p className="text-gray-300">
                Hire Date: {moment(employee.hireDate).format("LL")}
              </p>
              <p className="text-gray-300">
                Employee ID: {employee.employeeId}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold mb-4">Attendance</h3>
          <Line data={attendanceData} />
        </div>
      </div>
    </GymPanel>
  );
};

export default EmployeeDetails;
