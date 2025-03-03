import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../Helper";
import { toast } from "react-toastify";

export const GoogleNumber = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const OnhandleChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const access_token = localStorage.getItem("otpAccessCode") || "";

    if (!access_token) {
      toast.error("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const res = await post(
        "/account/account-googlelogin/",
        { phone: phone },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        localStorage.setItem("otpAccessCode", res?.data?.access_token);
        toast.success(res?.data?.message);
        localStorage.setItem("greenOTP", res?.data?.otp);
        navigate("/verify-otp");
      } else {
        toast.error("Something went wrong, try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" min-h-screen  login-container  flex flex-col   items-center   ">
      <div className="w-[380px] mt-32  ">
        <div className="border-2 border-white-400 rounded-xl px-4 py-6  w-full mt-6  form_section">
          <h2 className="text-2xl text-center text-white-500 font-semibold">
            Enter your mobile number
          </h2>

          <form onSubmit={handleSubmit} className="mt-5">
            <div>
              <label
                htmlFor="email_phone"
                className="text-white-500 font-semibold"
              >
                Mobile Number{" "}
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                required
                placeholder="0000000000"
                onChange={OnhandleChange}
                className="w-full border mt-1 border-white-500 p-2 rounded-md outline-red-500 "
              />
            </div>

            <button
              type="submit"
              className={`bg-red-600 w-full mt-6 py-2 rounded-xl text-white-500  ${
                loading && "cursor-not-allowed"
              }`}
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </form>
          <p className="text-white-500 mt-5">
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
