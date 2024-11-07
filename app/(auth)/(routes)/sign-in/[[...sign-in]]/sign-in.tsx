"use client";

import { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [email, setEmail] = useState("mrchike@mailinator.com");
  const [password, setPassword] = useState("mrchike123");
  const [rememberMe, setRememberMe] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission (button click)
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/token/', {
        email,
        password,
        rememberMe,
      });
      console.log('response', response.data.access)

      // Check if the response is valid, and then redirect to the dashboard
      if (response.data && response.data.token) {
        console.log("Login successful", response.data);

        // Redirect to the dashboard or another page
        window.location.href = "/search";  // Replace this with the URL you want to redirect to
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Login failed', error);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <img
              src="https://ethz.ch/staffnet/en/service/communication/corporate-design/logo/_jcr_content/par/greybox/par/image/image.imageformat.1286.1811079109.png"
              alt="ETHZurich"
              className="mx-auto"
            />
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold text-center">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed text-center">
                  Sign in to your account and explore a world of possibilities. Your journey begins here.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-black focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-black focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={handlePasswordToggle}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-black focus:ring-black border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/reset-password/"
                    className="text-black hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-black hover:bg-yellow-800 focus:outline-none"
                  onClick={handleSubmit} // Handle button click to submit the form
                >
                  Log in
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account{' '}
                <a
                  href="/sign-up/"
                  className="text-black font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>

          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mem7czf8414pqvr9fzv0.gif"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
              style={{ marginLeft: '50px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
