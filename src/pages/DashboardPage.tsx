import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GymCard from "../components/GymCard";
import AddIcon from "../assets/icons/add-icon.svg";
import Avatar from "../widgets/Avatar";
import SearchIcon from "../assets/icons/search-icon.svg";
import { fetchGyms } from "../service/gym/gymService";
import { useAuth } from "../context/authContext";

const DashboardPage = () => {
  const [gyms, setGyms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const prevScrollY = useRef(0);
  const { logout } = useAuth();

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (prevScrollY.current < currentScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header
        className={`bg-gray-800 p-4 sticky top-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">My Gyms</h1>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Avatar
                src="https://via.placeholder.com/150"
                alt="User Avatarrar"
                size="50px"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-gray-100 rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="">
        <section
          className={`flex ${showHeader ? "" : "sticky top-0"} ${
            !showHeader ? "bg-gray-800 p-4 shadow-md" : "bg-gray-900"
          } `}
        >
          <div className={`mt-2 flex items-center flex-1 px-6 py-4 `}>
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
          </nav>
        </section>
        <section className="px-6 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGyms.map((gym) => (
            <GymCard
              onClick={() => navigate(`/gym/${gym._id}/dashboard`)}
              key={gym._id}
              gym={gym}
            />
          ))}

          {filteredGyms.map((gym) => (
            <GymCard
              onClick={() => navigate(`/gym/${gym._id}/dashboard`)}
              key={gym._id}
              gym={gym}
            />
          ))}

          {filteredGyms.map((gym) => (
            <GymCard
              onClick={() => navigate(`/gym/${gym._id}/dashboard`)}
              key={gym._id}
              gym={gym}
            />
          ))}

          {filteredGyms.map((gym) => (
            <GymCard
              onClick={() => navigate(`/gym/${gym._id}/dashboard`)}
              key={gym._id}
              gym={gym}
            />
          ))}

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
