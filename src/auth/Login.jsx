import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { GoogleSignUp } from "./Google";
export const Login = () => {
  const [phone, setPhone] = useState("");
  const OnhandleChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSubmit = (e) => {
    e.propagationDefault();
  };
  return (
    <div className=" min-h-screen  login-container  flex flex-col   items-center   ">
      <div className="w-[380px] mt-32  ">
   
        <div className="border-2 border-white-400 rounded-xl px-4 py-6  w-full mt-6  form_section">
          <h2 className="text-2xl text-center text-white-500 font-semibold">
            Sign In
          </h2>
          <GoogleSignUp />
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
                className="w-full border border-white-500 p-2 rounded-md outline-red-500 "
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 w-full mt-3 py-2 rounded-xl text-white-500"
            >
              Continue
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
