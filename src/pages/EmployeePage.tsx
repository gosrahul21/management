import EmployeeForm from '../components/EmployeeForm';
import GymPanel from '../components/Gympanel';

const EmployeePage = () => {
  return (
    <GymPanel>
        <div className="px-10 py-6 grid grid-cols-2 gap-8">
            <div className="relative flex flex-col justify-center items-center px-6">
                <div className="relative z-0 ">
                <div className="absolute top-[85%] left-0 w-full z-10 bg-gray-800 bg-opacity-85 flex items-center rounded-lg">
                    <p className="text-2xl font-semibold text-center text-white px-10 py-2">
                        Adding employees is not just about expanding your team <br/> it's about building a family. <br/> You grow with them, and they grow with you.
                    </p>
                </div>
                    <img
                        src="/trainer.jpeg"
                        className="rounded-lg"
                        alt="Motivated Employees"
                    />
                </div>
            </div>
            <div className="px-6 rounded-md shadow-md bg-gray-800 bg-opacity-75">
                <EmployeeForm />
            </div>
        </div>
    </GymPanel>
  );
};

export default EmployeePage;
