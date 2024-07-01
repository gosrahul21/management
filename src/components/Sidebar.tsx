// src/components/Sidebar.js
import React, { forwardRef } from 'react';
import DashboardIcon from '../assets/icons/dashboard.svg';
import GroupIcon from '../assets/icons/groups-icon.svg';
import AttendanceIcon from '../assets/icons/attendance.svg';
import SubscriptionIcon from '../assets/icons/member-icon.svg';
import MembershipPlanIcon from '../assets/icons/membership-plan.svg';
import EmployeesIcon from '../assets/icons/employees-icon.svg';
import ShopIcon from '../assets/icons/shop-icon.svg';
import SalaryIcon from '../assets/icons/salary-icon.svg';

import NotificationIcon from '../assets/icons/notification.svg';


import { NavLink } from 'react-router-dom';





const Sidebar = forwardRef(({ isOpen, toggleSidebar }, ref) => {

  const SideBarNav = ({ title, to, icon, onClick }) => {
    return (
      <NavLink to={to} className="block px-4 py-2 mt-1 text-sm text-gray-200 hover:bg-gray-600 rounded flex gap-2" onClick={onClick}>
        <img src={icon} className="h-5 w-5 object-contain" alt={`${title} icon`} /> {title}
      </NavLink>
    );
  };

  return (
    <div
      ref={ref}
      className={`fixed inset-y-0 right-0 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-64 h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out z-100 shadow-lg`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <nav className="mt-10">
        <SideBarNav title="Dashboard" to="/dashboard" icon={DashboardIcon} onClick={toggleSidebar} />
        <div className="mt-2">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Clients</h2>
          <SideBarNav title="Subscribers" to="/subscribers" icon={SubscriptionIcon} onClick={toggleSidebar} />
          <SideBarNav title="Groups" to="/groups" icon={GroupIcon} onClick={toggleSidebar} />
          <SideBarNav title="Attendance" to="/attendance" icon={AttendanceIcon} onClick={toggleSidebar} />
          <SideBarNav title="Memberships Plan" to="/subscription" icon={MembershipPlanIcon} onClick={toggleSidebar} />
        </div>
        <div className="mt-2">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Staffs</h2>
          <SideBarNav title="Employees" to="/employees" icon={EmployeesIcon} onClick={toggleSidebar} />
          <SideBarNav title="Attendance" to="/staffs/attendance" icon={AttendanceIcon} onClick={toggleSidebar} />
          <SideBarNav title="Salary Management" to="/salary-management" icon={SalaryIcon} onClick={toggleSidebar} />
          <SideBarNav title="Manage Leaves" to="/staffs/manage-leaves" icon={AttendanceIcon} onClick={toggleSidebar} />
        </div>
        <SideBarNav title="Enquiry" to="/enquiry" icon={DashboardIcon} onClick={toggleSidebar} />
        <SideBarNav title="Notifications" to="/notifications" icon={NotificationIcon} onClick={toggleSidebar} />
        <SideBarNav title="Shop" to="/shop" icon={ShopIcon} onClick={toggleSidebar} />
        <div className="mt-2">
          <h2 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Reports</h2>
          <SideBarNav title="Income and Expense" to="/reports/income-expense" icon={DashboardIcon} onClick={toggleSidebar} />
          {/* <SideBarNav title="Membership and Sales" to="/reports/membership-sales" icon={DashboardIcon} onClick={toggleSidebar} /> */}
          {/* <SideBarNav title="Payment Dues" to="/reports/payment-dues" icon={DashboardIcon} onClick={toggleSidebar} /> */}
        </div>
      </nav>
    </div>
  );
});

export default Sidebar;
