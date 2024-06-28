import { useState } from 'react';
import EyeIcon from '../assets/icons/eye-slash.svg'
import EyeIOpencon from '../assets/icons/eye-open.svg'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white mb-4">Login</h2>
      <label className="block mb-2 text-gray-200">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
        required
      />
      <label className="block mb-2 text-gray-200">Password</label>
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-3 text-gray-400"
        >
          <img className='h-4 w-4 object-contain' src={showPassword?EyeIOpencon:EyeIcon}/> 
        </button>
      </div>
      <div className="mb-4">
        <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
