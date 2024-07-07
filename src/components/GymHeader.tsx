import { Link } from "react-router-dom";
import MenuIcon from "../assets/icons/menu-icon.svg";
import CloseIcon from "../assets/icons/close-icon.svg";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { useGym } from "../context/GymContext";

const GymHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef({});
  const {gym} = useGym()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX > window.innerWidth - 20) {
        openSidebar();
      }
      // console.log(sidebarRef.current.offsetWidth)
      if (e.clientX < window.innerWidth - sidebarRef.current.offsetWidth) {
        closeSidebar();
      }
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 z-100 p-4 sticky top-0 shadow-lg">
      <Sidebar ref={sidebarRef} isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{gym?.name}</h1>
          <p className="text-lg">{gym?.address}, {gym?.city}</p>
        </div>
        <div className="flex items-center">
          <div className="relative dropdown">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded inline-flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar();
              }}
            >
              {isOpen ? (
                <img src={CloseIcon} className="h-6 w-6 object-contain" />
              ) : (
                <img src={MenuIcon} className="h-6 w-6 object-contain" />
              )}{" "}
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
          .dropdown:hover .dropdown-menu {
            display: block;
          }
        `}
      </style>
    </header>
  );
};

export default GymHeader;
