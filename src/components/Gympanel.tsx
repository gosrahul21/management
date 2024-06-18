import GymHeader from "./GymHeader";

const GymPanel = ({children}: any)=>{
    const gymDetails = {
        name: 'Fitness Zone',
        location: '123 Gym Street, Cityville',
        members: {
          total: 200,
          active: 180,
        },
        subscriptions: [
          { id: 1, name: 'Basic Membership', price: '$50/month' },
          { id: 2, name: 'Premium Membership', price: '$100/month' },
        ],
        staff: [
          { id: 1, name: 'John Doe', role: 'Manager' },
          { id: 2, name: 'Jane Smith', role: 'Trainer' },
        ],
        classes: [
          { id: 1, name: 'Yoga Class', time: 'Monday, Wednesday, Friday 9:00 AM' },
          { id: 2, name: 'Boxing Class', time: 'Tuesday, Thursday 6:00 PM' },
        ],
        // Add more details as needed
      };

    return <div className="bg-gray-900 text-white min-h-screen">
        <GymHeader gymDetails={gymDetails}/>
        {children}
    </div>
};

export default GymPanel



