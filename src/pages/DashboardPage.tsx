import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GymCard from "../components/GymCard";
import AddIcon from "../assets/icons/add-icon.svg";
import Avatar from "../widgets/Avatar";
import SearchIcon from "../assets/icons/search-icon.svg";
import { fetchGyms } from "../service/gym/gymService";

const DashboardPage = () => {
  const [gyms, setGyms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getGyms = async () => {
      try {
        const data = await fetchGyms();
        setGyms(data);
      } catch (error) {
        console.error("Error fetching gyms", error);
      }
    };

    getGyms();
  }, []);

  // Filter gyms based on search term
  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4 sticky top-0 flex items-center">
        <h1 className="text-3xl">My Gyms</h1>
        <nav className="mt-2 flex justify-end gap-2 flex-1 items-center">
          <Link to="">
            <Avatar
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              size="50px"
            />
          </Link>
        </nav>
      </header>
      <main className="relative">
        <section className="flex sticky top-0 bg-gray-900">
          <div className="mt-2 flex items-center flex-1 px-6">
            <input
              type="text"
              placeholder="Search by gym name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
              <img src={SearchIcon} alt="Search Icon" />
            </button>
          </div>
          <nav className="mt-2 flex gap-2 items-center">
            <Link
              to="/create-gym"
              className="bg-blue-600 flex gap-2 items-center text-white py-2 px-4 rounded hover:bg-blue-700 mr-4"
            >
              <img src={AddIcon} alt="Add Icon" />
              Add Gym
            </Link>
            <Link
              to="/subscribe-gym"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Subscribe to Gym
            </Link>
          </nav>
        </section>
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGyms.map((gym) => (
            <GymCard
              onClick={() => navigate(`/gym/${gym._id}/dashboard`)}
              key={gym._id}
              gym={gym}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
