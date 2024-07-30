import GymHeader from "./GymHeader";
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
