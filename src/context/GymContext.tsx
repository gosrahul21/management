import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getGymDetails } from "../service/gym/gymService";

const GymContext = createContext<{
  gym: any | null;
  setGym: React.Dispatch<React.SetStateAction<any | null>>;
}>({
  gym: null,
  setGym: () => {},
});

export const GymProvider = ({ children }: any) => {
  const [gym, setGym] = useState(null);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    console.log(params);
    if (!params) return;

    fetchGymDetails();
  }, [location, params]);

  const fetchGymDetails = async () => {
    try {
      const gymDetails = await getGymDetails(params.gymId!);
      setGym(gymDetails);
    } catch (error) {
      console.error("Failed to fetch gym details", error);
    }
  };
  return (
    <GymContext.Provider value={{ gym, setGym }}>
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => useContext(GymContext);
