import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { useGym } from "../context/GymContext";
import DashboardIcon from "../assets/icons/dashboard.svg";
import GroupIcon from "../assets/icons/groups-icon.svg";
import AttendanceIcon from "../assets/icons/attendance.svg";
import SubscriptionIcon from "../assets/icons/member-icon.svg";
import MembershipPlanIcon from "../assets/icons/membership-plan.svg";
import EmployeesIcon from "../assets/icons/employees-icon.svg";
import ShopIcon from "../assets/icons/shop-icon.svg";
import SalaryIcon from "../assets/icons/salary-icon.svg";
import NotificationIcon from "../assets/icons/notification.svg";

const Sidebar = forwardRef(({ isOpen, toggleSidebar }, ref) => {
  const { gym } = useGym();

  const SideBarNav = ({ title, to, icon, onClick }) => {
    return (
      <NavLink
        to={to}
        className="px-4 py-2 mt-1 text-sm text-gray-200 hover:bg-gray-600 rounded flex gap-2"
        onClick={onClick}
      >
        <img
          src={icon}
          className="h-5 w-5 object-contain"
          alt={`${title} icon`}
        />{" "}
        {title}
      </NavLink>
    );
  };

  return (
    <div
      ref={ref}
      className={`fixed inset-y-0 right-0 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-64 h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out z-10 shadow-lg`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <nav className="mt-10">
        <SideBarNav
          title="Dashboard"
          to="/"
          icon={DashboardIcon}
          onClick={toggleSidebar}
        />
        <div className="mt-2">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
            Clients
          </h2>
          <SideBarNav
            title="Subscribers"
            to={`/gym/${gym?._id}/subscribers`}
            icon={SubscriptionIcon}
            onClick={toggleSidebar}
          />
          <SideBarNav
            title="Groups"
            to={`/gym/${gym?._id}/groups`}
            icon={GroupIcon}
            onClick={toggleSidebar}
          />
          <SideBarNav
            title="Attendance"
            to={`/gym/${gym?._id}/attendance`}
            icon={AttendanceIcon}
            onClick={toggleSidebar}
          />
          <SideBarNav
            title="Memberships Plan"
            to={`/gym/${gym?._id}/subscription`}
            icon={MembershipPlanIcon}
            onClick={toggleSidebar}
          />
        </div>
        <div className="mt-2">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
            Staffs
          </h2>
          <SideBarNav
            title="Employees"
            to={`/gym/${gym?._id}/employees`}
            icon={EmployeesIcon}
            onClick={toggleSidebar}
          />
          <SideBarNav
            title="Attendance"
            to={`/gym/${gym?._id}/staffs/attendance`}
            icon={AttendanceIcon}
            onClick={toggleSidebar}
          />
          <SideBarNav
            title="Salary Management"
            to={`/gym/${gym?._id}/salary-management`}
            icon={SalaryIcon}
            onClick={toggleSidebar}
          />
          <SideBarNav
            title="Manage Leaves"
            to={`/gym/${gym?._id}/staffs/manage-leaves`}
            icon={AttendanceIcon}
            onClick={toggleSidebar}
          />
        </div>
        <SideBarNav
          title="Enquiry"
          to={`/gym/${gym?._id}/enquiry`}
          icon={DashboardIcon}
          onClick={toggleSidebar}
        />
        <SideBarNav
          title="Notifications"
          to="/notifications"
          icon={NotificationIcon}
          onClick={toggleSidebar}
        />
        <SideBarNav
          title="Shop"
          to={`/gym/${gym?._id}/shop`}
          icon={ShopIcon}
          onClick={toggleSidebar}
        />
        <div className="mt-2">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
            Reports
          </h2>
          <SideBarNav
            title="Income and Expense"
            to="/reports/income-expense"
            icon={DashboardIcon}
            onClick={toggleSidebar}
          />
        </div>
      </nav>
    </div>
  );
});

export default Sidebar;
