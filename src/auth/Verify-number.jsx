import { toast } from "react-toastify";
import { post } from "../Helper/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeUser } from "../Helper/Helper";
import "./style.css";

export const VerifyNumber = () => {
  const [otpValue, setOTPValue] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const GreenOTP = localStorage.getItem("greenOTP") || "";
  const access_token = localStorage.getItem("otpAccessCode") || "";

  useEffect(() => {
    if (!access_token) {
      toast.error("Authentication token is missing. Please log in again.");
      navigate("/login");
      return; // Stop execution if no token
    }

    if (GreenOTP) {
      setOTPValue(GreenOTP);
    }
  }, []);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await post(
        "/account/verify-otp/",
        { otp: otpValue },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("OTP verified successfully!");
      storeUser(response?.data);
      navigate("/");
    } finally {
      setLoading(false);
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
                placeholder="00000"
                required
                onChange={(e) => setOTPValue(e.target.value)}
                className="w-full border border-white-500 p-2 rounded-md outline-red-500"
              />
            </div>

            <button
              type="submit"
              className={`bg-red-600 w-full mt-3 py-2 rounded-xl text-white-500 ${
                loading && "cursor-not-allowed"
              }`}
            >
              {loading ? "Loading..." : " Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
