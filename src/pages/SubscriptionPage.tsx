import SubscriptionForm from '../components/SusbcriptionForm';
import Header from '../components/Header';

const SubscriptionPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
         <Header/>
         <div className='p-10'>
         <SubscriptionForm />
         </div>
    </div>
  );
};

export default SubscriptionPage;
