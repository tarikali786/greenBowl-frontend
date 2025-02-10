import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Autocomplete } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { post } from "../../../../servic";
import { userData } from "../../../../Helper/Helper";
import { useEffect, useState } from "react";

export const AddressForm = ({ setUserAddress, userAddress }) => {
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const { access_green } = userData();

  const [userInfo, setUserInfo] = useState({
    street_address: "",
    street_address2: "",
    city: "",
    state: "",
    district: "",
    country: "India",
    pin_code: "",
  });

  const headers = {
    Authorization: `Bearer ${access_green}`,
    "Content-Type": "application/json",
  };

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

  const handleOnchange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleStateChange = (event, value) => {
    setUserInfo({ ...userInfo, state: value });
  };
  useEffect(() => {
    fetchCountryData();
  }, []);
  console.log(userInfo);

  const createUserAddress = async () => {
    const api = `/create-user-address/`;

    try {
      const response = await post(api, userInfo, { headers });
      console.log(response);

      if (response.status == 201) {
        setUserAddress([...(userAddress || []), response.data]);

        toast.success("Successfully added");
      } else {
        console.error("something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createUserAddress();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p className="text-xl text-black-400 ">Create Your Delivery Address</p>

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
              <TextField {...params} required label="State" variant="filled" />
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
            label="District"
            variant="filled"
            required
            className="w-full bg-white-500 rounded"
            name="district"
            value={userInfo.district}
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
  );
};
