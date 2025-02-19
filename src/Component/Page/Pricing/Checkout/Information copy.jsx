import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Autocomplete } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const Information = memo(
  ({ settabValue, setCheckInfo, setPaymentIntentid }) => {
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const price = useSelector((state) => state.salad.orderDetails.price);

    const [userInfo, setUserInfo] = useState({
      email: "",
      fname: "",
      lname: "",
      phone: "",
      street_address: "",
      street_address2: "",
      district: "",
      country: "India",
      pin_code: "",
      state: "",
      city: "",
    });

    useEffect(() => {
      if (
        userInfo.email !== "" &&
        userInfo.fname !== "" &&
        userInfo.lname !== "" &&
        userInfo.phone !== "" &&
        userInfo.district !== "" &&
        userInfo.street_address !== "" &&
        userInfo.country !== "" &&
        userInfo.pin_code !== "" &&
        userInfo.state !== "" &&
        userInfo.city !== ""
      ) {
        setCheckInfo(true);
      } else {
        setCheckInfo(false);
      }
    }, [userInfo]);

    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/states"
        );
        const defaultCountry = response?.data?.data.find(
          (country) => country.name === "India"
        );
        setStates(defaultCountry ? defaultCountry.states : []);
      } catch (error) {
        console.error("Error fetching countries and states", error);
      }
    };

    useEffect(() => {
      const LocaluserInfo = localStorage.getItem("userPaymentInfo");
      if (price) {
        window.location.href = "/order";
      }

      if (LocaluserInfo) {
        setUserInfo(JSON.parse(LocaluserInfo));
      }
      fetchCountryData();
    }, []);

    const handleOnchange = (e) => {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleStateChange = (event, value) => {
      setUserInfo({ ...userInfo, state: value });
    };

    const createPaymentIntent = async () => {
      const api = `${
        import.meta.env.VITE_API_URL
      }/nummero/create-payment-intent/`;

      const data = {
        amount: price * 100,
        fname: userInfo?.fname,
        lname: userInfo?.lname,
        currency: "INR",
        address: {
          line1: userInfo?.street_address,
          city: userInfo?.city,
          state: userInfo?.state,
          postal_code: userInfo?.pin_code,
          country: userInfo?.country,
        },
        email: userInfo.email,
        phone: userInfo.phone,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.post(api, data, { headers });
        setPaymentIntentid(response.data.payment_intent_id);

        settabValue("2");
        toast.success(`Payment Information successfull`);
      } catch (error) {
        toast.error("Failed to create payment intent. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
      localStorage.setItem("userPaymentInfo", JSON.stringify(userInfo));
      createPaymentIntent();
    };

    return (
      <div className="mt-5 border p-4 rounded-lg bg-blue-100">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-xl text-black-400 ">
              Create Your Delivery Address
            </p>

            <div className="flex lg:flex-row flex-col gap-3 my-3">
              <TextField
                label="Email"
                variant="filled"
                required
                className="w-full bg-white-500 rounded"
                name="email"
                value={userInfo.email}
                onChange={handleOnchange}
              />
              <TextField
                label="Full name"
                variant="filled"
                required
                className="w-full bg-white-500 rounded"
                name="lname"
                value={userInfo.lname}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex lg:flex-row flex-col gap-3 my-3">
              {/* Country */}
              <TextField
                label="Country"
                variant="filled"
                required
                className="w-full bg-white-500 rounded"
                name="country"
                value={userInfo.country}
                onChange={handleOnchange}
              />
              <TextField
                label="Pin Code"
                variant="filled"
                required
                className="w-full bg-white-500 rounded"
                name="pin_code"
                value={userInfo.pin_code}
                onChange={handleOnchange}
              />
              {/* State */}
              <Autocomplete
                className="bg-white-500 text-blue-500 rounded-2xl w-full"
                value={userInfo.state}
                onChange={handleStateChange}
                options={states.map((state) => state.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="State"
                    variant="filled"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <TextField
                label="Post"
                variant="filled"
                className="w-full bg-white-500 rounded"
                name="post"
                value={userInfo.post}
                onChange={handleOnchange}
              />
              <TextField
                label="Billing address line 1 "
                variant="filled"
                className="w-full bg-white-500 rounded"
                name="street_address"
                required
                value={userInfo.street_address}
                onChange={handleOnchange}
              />
              <TextField
                label="Billing address line 2 "
                variant="filled"
                className="w-full bg-white-500 rounded"
                name="street_address2"
                value={userInfo.street_address2}
                onChange={handleOnchange}
              />
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <TextField
                label="Town / City"
                variant="filled"
                className="w-full bg-white-500 rounded"
                name="city"
                required
                value={userInfo.city}
                onChange={handleOnchange}
              />
              <TextField
                label="Phone"
                variant="filled"
                required
                className="w-full bg-white-500 rounded"
                name="phone"
                value={userInfo.phone}
                onChange={handleOnchange}
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-between mt-6 items-center">
            <Link to="/subscription" className="text-blue-500">
              Return to cart
            </Link>
            <button
              type="submit"
              className="bg-green-500 hover:bg-red-500 px-4 py-3 rounded-xl"
            >
              {loading ? "Processing..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    );
  }
);

Information.displayName = "Information";
