import SubscriberForm from '../components/SubscriberForm';
import GymPanel from '../components/Gympanel';

const SubscriberPage = () => {
  return (
    <GymPanel>
      <div className='flex justify-center mt-10'>
        <SubscriberForm />
      </div>
    </GymPanel>
  );
};

export default SubscriberPage;
