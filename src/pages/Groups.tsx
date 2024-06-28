import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GymPanel from '../components/Gympanel';
import SearchIcon from '../assets/icons/search-icon.svg';
import Groups from '../config/group';
import AddGroupForm from '../components/AddGroupForm';
import Modal from '../components/Modal';

const GroupList = () => {
  const [groups, setGroups] = useState<Record<string, string>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetch for group data (replace with actual API call)
    const fetchGroups = async () => {
      // Simulated data
      const data = [
        {
          id: 1,
          name: 'Yoga Class',
          time: 'Monday, Wednesday, Friday 9:00 AM',
          instructor: 'John Doe',
        },
        {
          id: 2,
          name: 'Boxing Class',
          time: 'Tuesday, Thursday 6:00 PM',
          instructor: 'Jane Smith',
        },
        // Add more group data as needed
      ];
      setGroups(Groups as any);
    };

    fetchGroups();
  }, []);

  const filterGroups = () => {
    return groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGroups = filterGroups();

  const [isAddEditFormOpen, setisAddEditFormOpen] = useState(false);

  const openAddEditForm = () => {
    setisAddEditFormOpen(true);
  };

  const closeAddEditForm = () => {
    setisAddEditFormOpen(false);
  };

  const handleEditExpense = () => {
    // Logic to handle editing expense
    closeAddEditForm(); // Close the modal after editing
  };


  return (
    <GymPanel>
      <div className='p-6'>
        <Modal isOpen={isAddEditFormOpen} onClose={handleEditExpense} title={"Add Group"} >
            <AddGroupForm onSubmit={null}/>
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Groups</h1>
          <button onClick={openAddEditForm} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Group
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by group name."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Groups List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} onClick={() => navigate(`/group/profile/${group.id}`)} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start">
              <div>
                <h2 className="text-xl font-bold">{group.name}</h2>
                <p className="text-gray-400">Time: {group.time}</p>
                <p className="text-gray-400">Instructor: {group.instructor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default GroupList;
