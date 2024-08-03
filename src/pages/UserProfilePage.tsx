import { useState, useEffect } from "react";
import moment from "moment";
import { Bar, Line } from "react-chartjs-2";
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
import QRCode from "react-qr-code";
import GymPanel from "../components/Gympanel";
import { useNavigate, useParams } from "react-router-dom";
import WhatsappIcon from "../assets/icons/whatsapp-icon.svg";
import { FcPhone } from "react-icons/fc";
import { getMemberById } from "../service/susbcriber/getmember";
import { useDropzone } from "react-dropzone";
import { enqueueSnackbar } from "notistack";
import { uploadImage } from "../service/upload/imageUpload";
import { updateProfileDetails } from "../service/members/updateMember";

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

const UserProfile = () => {
  const { id, gymId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [fetching, setFetching] = useState<any>(true);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    const member = await getMemberById(id!);
    setUser(member);
    setFetching(false);
  };

  useEffect(() => {
    if (!user) return;
    setFormData({
      firstName: user.userId?.firstName,
      lastName: user.userId.lastName,
      email: user.userId.email,
      phoneNo: user.userId.phoneNo,
      image: user.userId.image,
    });
  }, [user]);

  // if (!user) {
  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
  //       <div className="loader">
  //         <Spinner />
  //       </div>
  //     </div>
  //   );
  // }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let image = null;
    if (imageFile) {
      try {
        const uploadResponse = await uploadImage(imageFile);
        image = uploadResponse._id; // Assuming your API returns the ID of the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
        enqueueSnackbar("Error uploading image", { variant: "error" });
        return;
      }
    }
    // update user details
    const updatedMember = await updateProfileDetails(
      user.userId._id,
      image ? { ...formData, image } : formData
    );
    console.log(user, {
      ...user,
      userId: updatedMember,
    });
    setUser({
      ...user,
      userId: updatedMember,
    });
    setEditing(false);
  };

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
        label: "Visits",
        data: [10, 12, 8, 15, 20, 18, 14, 22, 19, 23, 25, 30],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const activityData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Classes",
        data: [2, 3, 4, 1],
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "PT Sessions",
        data: [1, 2, 1, 3],
        fill: false,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const healthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [75, 74.5, 74, 73.5],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const bmiData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "BMI",
        data: [24.5, 24.3, 24.0, 23.8],
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const caloriesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Calories Burned (kcal)",
        data: [2000, 2100, 2200, 2300],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDrop = (acceptedFiles: File[]) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  } as any);

  const sendMessageOnWhatsApp = () => {
    const phoneNumber = user.userId.phoneNo.replace(/[^0-9]/g, "");
    const message = `Hello ${user.userId.firstName},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const makePhoneCall = () => {
    const phoneNumber = user.userId.phoneNo;
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const startDate = user?.activeSubscriptions?.startDate;
  const durationInDays = user?.activeSubscriptions?.planId?.durationInDays;

  const endDate = moment(new Date(startDate)).add(durationInDays, "days");
  const daysLeft = endDate.diff(moment(), "days");
  const daysToStart = moment(startDate).diff(moment(), "days");
  const isExpired = daysLeft < 0;

  return (
    <GymPanel>
      {!user || fetching ? (
        <div className="bg-gray-900 text-white min-h-screen p-6">
          <header className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-start items-center">
            <h1 className="text-3xl font-bold">User Profile</h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start">
              <div className="w-32 h-32 rounded-full bg-gray-600 mr-4 mb-4 md:mb-0"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-600 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 w-1/3"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 w-1/4"></div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              <div className="ml-auto">
                <div className="h-16 w-16 bg-gray-600 rounded"></div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="h-6 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-600 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-600 rounded mb-2 w-1/3"></div>
              <div className="h-4 bg-gray-600 rounded mb-2 w-1/4"></div>
              <div className="h-4 bg-gray-600 rounded mb-2 w-1/5"></div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
              <div className="h-6 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-48 bg-gray-600 rounded"></div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="h-6 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-48 bg-gray-600 rounded"></div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="h-6 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-48 bg-gray-600 rounded"></div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="h-6 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-48 bg-gray-600 rounded"></div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="h-6 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-48 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 text-white min-h-screen p-6">
          <header className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">User Profile</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </header>

          {editing ? (
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start">
                <img
                  src={
                    user.userId?.image
                      ? `${import.meta.env.VITE_BACKEND_URI}/image/${
                          user.userId?.image
                        }`
                      : import.meta.env.VITE_DEFAULT_ALT_IMAGE
                  }
                  alt={`${user.userId?.firstName}'s profile`}
                  className="w-32 h-32 rounded-full object-cover mr-4 mb-4 md:mb-0"
                />
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="block text-sm">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 text-white rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="block text-sm">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 text-white rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 text-white rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phoneNo" className="block text-sm">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 text-white rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="image" className="block text-sm">
                      Profile Image
                    </label>
                    <div
                      {...getRootProps()}
                      className="w-full p-6 bg-gray-700 border border-gray-600 rounded mb-4 text-white text-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      {imageFile ? (
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded mb-4"
                        />
                      ) : (
                        <p>Drag and drop an image, or click to select one</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-start">
                <div className="flex flex-col md:flex-row">
                  <img
                    src={
                      user.userId?.image
                        ? `${import.meta.env.VITE_BACKEND_URI}/image/${
                            user.userId?.image
                          }`
                        : import.meta.env.VITE_DEFAULT_ALT_IMAGE
                    }
                    alt={`${user.userId?.firstName}'s profile`}
                    className="w-32 h-32 rounded-full object-cover mr-4 mb-4 md:mb-0"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{`${user.userId.firstName} ${user.userId.lastName}`}</h2>
                    <p className="text-gray-400">{user.userId.email}</p>
                    <p className="text-gray-400">+91 {user.userId.phoneNo}</p>
                    <p className="text-gray-300">
                      Joined Date: {moment(user.createdAt).format("LL")}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={WhatsappIcon}
                        className="h-8 w-8 cursor-pointer"
                        onClick={sendMessageOnWhatsApp}
                      />
                      <FcPhone
                        onClick={makePhoneCall}
                        className="cursor-pointer"
                        size={30}
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-auto">
                  <QRCode
                    value={user.userId._id}
                    size={64}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">
                  Membership & Subscription Information
                </h3>
                <div className="mt-4">
                  <h4 className="text-lg font-bold mb-2">Subscriptions</h4>
                  {user.activeSubscriptions ? (
                    <div className="mb-4">
                      <p className="text-gray-300">
                        Plan: {user.activeSubscriptions?.planId?.planName}
                      </p>
                      <p className="text-gray-300">
                        Start Date: {moment(startDate).format("LL")}
                      </p>

                      <p className="text-gray-300">
                        Expiry Date: {moment(endDate).format("LL")}
                      </p>
                      <p
                        className={`text-lg ${
                          isExpired ? "text-red-500" : "text-green-400"
                        }`}
                      >
                        Status:{" "}
                        {moment(endDate).isBefore(moment())
                          ? "Expired"
                          : "Active"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex">
                      {" "}
                      No Active Plan {!user.activeSubscriptions}
                    </div>
                  )}
                  <p className="text-green-400">
                    {user?.activeSubscriptions
                      ? isExpired
                        ? "Expired"
                        : new Date().getTime() < new Date(startDate).getTime()
                        ? `${daysToStart} days to start`
                        : `${daysLeft} days left`
                      : "New Member"}
                  </p>
                  {(!user.activeSubscriptions || isExpired) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/${gymId}/add-subscription/${user._id}`);
                      }}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded"
                    >
                      {isExpired ? "Renew Plan" : "Add Plan"}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md ">
                <h3 className="text-xl font-bold mb-4">Attendance Overview</h3>
                <Bar data={attendanceData} options={{ responsive: true }} />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Activity Overview</h3>
                <Line data={activityData} options={{ responsive: true }} />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Health Data</h3>
                <Line data={healthData} options={{ responsive: true }} />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">BMI Data</h3>
                <Line data={bmiData} options={{ responsive: true }} />
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Calories Data</h3>
                <Line data={caloriesData} options={{ responsive: true }} />
              </div>
            </div>
          )}
        </div>
      )}
    </GymPanel>
  );
};

export default UserProfile;
