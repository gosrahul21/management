import SettingIcon from '../assets/icons/setting-icon.svg'

const GymCard = ({ gym, onClick }: {
  onClick: ()=>void;
  gym: any
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <img src={`http://localhost:3000/image/${gym.image}`} alt={gym.name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{gym.name}</h3>
        <p className="text-gray-400 mb-2">Role: {gym.role}</p>
        <p className="text-gray-400 mb-4">{gym.subscribed ? 'Subscribed' : 'Not Subscribed'}</p>
        <div className="flex justify-end">
          <button onClick={onClick} className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 mr-2">
            <img src={SettingIcon}/>
            {/* Manage */}
          </button>
          {/* <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Unsubscribe
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default GymCard;
