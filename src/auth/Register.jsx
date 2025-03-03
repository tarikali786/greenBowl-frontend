import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../Helper/Api";
import { GoogleSignUp } from "./Google";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await post("/account/account-register/", user);
    toast.success(response.data.message);
    localStorage.setItem("greenOTP", response?.data?.otp);
    localStorage.setItem("otpAccessCode", response?.data?.access_token);
    setLoading(false);
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen register-container flex flex-col items-center">
      <div className="md:w-[440px] w-[280px] mt-24">
        <div className="border-2 border-white-400 rounded-xl px-4 py-6 w-full mt-6 form_section">
          <>
            <h2 className="text-2xl text-center text-white-500 font-semibold">
              Create Account
            </h2>
            <GoogleSignUp />
            <p className="text-white-500 text-center mt-4 dividerCard ">Or </p>

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
                className={`bg-red-600 w-full mt-3 py-2 rounded-xl text-white-500 ${
                  loading && "cursor-not-allowed"
                }`}
              >
                {loading ? "Loading.." : "Verify Mobile Number"}
              </button>
            </form>
            <p className="text-white-500 mt-5">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </>
        </div>
      </div>
    </div>
  );
};
