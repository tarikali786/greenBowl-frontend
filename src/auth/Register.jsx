import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../Helper/Api";
import axios from "axios";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [otp, setOTP] = useState(false); // Toggle OTP screen
  const [otpValue, setOTPValue] = useState("");

  // Handle form input changes
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.name || !user.email || !user.phone) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/account/account-register/",
        user
      );

      if (response.status === 201) {
        toast.success(
          "An OTP has been sent to your mobile number. Please check and verify."
        );
        setOTP(true); // Switch to OTP input screen
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle specific backend errors
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.detail || "Failed to register. Try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Handle OTP submission
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (!otpValue) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await post(
        "http://127.0.0.1:8000/api/account/verify-otp/",
        { otp: otpValue }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          window.location.href = "/"; // Redirect to home after successful OTP verification
        }, 1500);
      } else {
        toast.error("OTP verification failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.detail || "Invalid OTP. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen register-container flex flex-col items-center">
      <div className="w-[380px] mt-24">
        <div className="border-2 border-white-400 rounded-xl px-4 py-6 w-full mt-6 form_section">
          {otp ? (
            <>
              <h2 className="text-2xl text-center text-white-500 font-semibold">
                Verify Your Mobile Number
              </h2>
              <form onSubmit={handleOTPSubmit} className="mt-5">
                <div>
                  <label htmlFor="otp" className="text-white-500">
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    value={otpValue}
                    placeholder="0000"
                    required
                    onChange={(e) => setOTPValue(e.target.value)}
                    className="w-full border border-white-500 p-2 rounded-md outline-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-600 w-full mt-3 py-2 rounded-xl text-white-500"
                >
                  Verify OTP
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl text-center text-white-500 font-semibold">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="mt-5">
                <div>
                  <label htmlFor="name" className="text-white-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user?.name}
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                    className="w-full border border-white-500 p-2 rounded-md outline-red-500"
                  />
                </div>
                <div className="my-4">
                  <label htmlFor="phone" className="text-white-500">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={user?.phone}
                    placeholder="0000000000"
                    required
                    onChange={handleChange}
                    className="w-full border border-white-500 p-2 rounded-md outline-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-white-500">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email}
                    placeholder="john@gmail.com"
                    required
                    onChange={handleChange}
                    className="w-full border border-white-500 p-2 rounded-md outline-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-600 w-full mt-3 py-2 rounded-xl text-white-500"
                >
                  Verify Mobile Number
                </button>
              </form>
              <p className="text-white-500 mt-5">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
