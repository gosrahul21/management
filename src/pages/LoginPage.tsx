import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import GoogleIcon from '../assets/icons/google-icon.svg';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {


  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse: { code: string }) => {
      console.log(tokenResponse);
    },
  });



  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="px-10 py-6 flex justify-center flex-col items-center">
        <LoginForm />

        <button
          className="py-2 mt-4 flex items-center gap-2 px-4 bg-gray-700 text-white shadow-md rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={googleLogin}
        >
          <img src={GoogleIcon} className="h-6 w-6" alt="Google Icon" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
