import { useParams } from "react-router-dom";
import GymHeader from "./GymHeader";
import { createContext, useContext, useEffect, useState } from "react";
import { getGymDetails } from "../service/gym/gymService";
import { GymProvider } from "../context/GymContext";

const GymPanel = ({ children }: any) => {
  return (
    <GymProvider>
      <div className="bg-gray-900 text-white min-h-screen">
        <GymHeader />
        {children}
      </div>
    </GymProvider>
  );
};

export default GymPanel;
