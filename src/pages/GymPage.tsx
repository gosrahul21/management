import GymForm from '../components/GymForm';
import Header from '../components/Header';

const GymPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="px-10 py-6 grid grid-cols-2">
        <div className="relative flex flex-col justify-center px-6">
          <div className="absolute top-[65%] left-0 w-full p-6 z-10 flex items-center  text-center">
            {/* <h3 className="text-xl font-semibold mb-2 text-white">
              Motivational Quote:
            </h3> */}
            <p className=" italic text-white font-bold text-2xl">
              "Building a gym isn't just about bricks and steel; it's about
              creating a sanctuary where strength meets determination, and
              dreams transform into achievements."
            </p>
            {/* <p className="mt-4 font-sm text-white">
              - Founder's Vision
            </p> */}
          </div>
          <div className="relative z-0">
            <img
              src="/couple.jpeg"
              className="rounded-lg bg-gray opacity-90"
              alt="Couple in gym"
            />
          </div>
        </div>

        <div className="px-6 rounded-md shadow-md">
          <GymForm />
        </div>
      </div>
    </div>
  );
};

export default GymPage;
