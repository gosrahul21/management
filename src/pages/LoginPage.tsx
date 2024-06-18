import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse: { code: string }) => {
      // setIsLoggedIn(true)
      // setCode(tokenResponse.code)
      // alert(tokenResponse)
      console.log(tokenResponse)
    },
  })
  return (
    <div className="bg-background min-h-screen">
      <Header/>
      <div className='px-10'>
        <LoginForm />
        <button className='py-2 bg-blue-700' onClick={googleLogin}>Sign in with google</button>
      </div>
    </div>
  );
};

export default LoginPage;
