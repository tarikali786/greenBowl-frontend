import "./style.css";
import { toast } from "react-toastify";
// import { post } from "../Helper/Api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const VerifyNumber = () => {
  const [otpValue, setOTPValue] = useState("");
  const navigate = useNavigate();

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/account/verify-otp/",
        { otp: otpValue }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
        </div>
      </div>
    </div>
  );
};
