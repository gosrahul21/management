import { useEffect, useState } from "react";
import EyeIcon from "../assets/icons/eye-slash.svg";
import EyeOpenIcon from "../assets/icons/eye-open.svg";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logged in with email and password");
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP request logic here (e.g., call API to send OTP)
    setOtpSent(true);
    console.log("OTP requested");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let interval: any = null;
    if (!resendEnabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setResendEnabled(true);
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendEnabled]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Auto-focus to next input box
    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // If all OTP fields are filled, authenticate OTP
    if (newOtp.every((digit) => digit !== "")) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000); // Simulate authentication delay
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = () => {
    // Implement resend OTP logic here
    console.log("OTP resent");
    setResendEnabled(false);
    setTimer(30);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white mb-4">Login</h2>

      {!otpSent ? (
        <form onSubmit={handleRequestOtp}>
          <label className="block mb-2 text-gray-200">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Request OTP
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <div className="flex gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl bg-gray-700 text-white rounded-md focus:outline-none"
              />
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={handleResendOtp}
              disabled={!resendEnabled}
              className={`py-2 px-4 ${
                resendEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600"
              } text-white rounded-lg transition duration-200`}
            >
              {resendEnabled ? "Resend OTP" : `Resend OTP in ${timer}s`}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-2xl text-white mb-4">Or Login with Email</h2>
        <form onSubmit={handleSubmit}>
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
              type={showPassword ? "text" : "password"}
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
              <img
                className="h-4 w-4 object-contain"
                src={showPassword ? EyeOpenIcon : EyeIcon}
                alt="Toggle Password Visibility"
              />
            </button>
          </div>
          <div className="mb-4">
            <a href="#" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader">Authenticating...</div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
