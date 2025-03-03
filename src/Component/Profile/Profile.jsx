import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../../features/saladSlice";
export const Profile = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const userDetails = useSelector((state) => state?.salad?.userDetails);
  console.log(userDetails);

  useEffect(() => {
    if (!userDetails) {
      dispatch(fetchUserDetails());
    }
  }, []);
  const [formData, setFormData] = useState({
    name: userDetails?.name,
    email: userDetails?.email,
    phone: userDetails?.phone,
    gender: userDetails?.gender,
  });


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleUpdateProfile = async () => {
  //   try {
  //     const response = await patch("/api/user/profile/", formData, {
  //       headers,
  //     });
  //     setUserDetails(response.data);
  //     setEditing(false);
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  if (!userDetails) {
    return <div className="text-center py-10">Loading user details...</div>;
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white-500 rounded-xl shadow-lg mt-10">
      <div>
        <div>
          {editing ? (
            <>
              <input
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full mb-2"
              />
              <input
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full mb-2"
              />
              <input
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full mb-2"
              />
              <select
                name="gender"
                value={formData?.gender}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full mb-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <button
                // onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="ml-2 text-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-medium">
                {userDetails.name || "Unknown Name"}
              </p>
              <p className="text-black-400">Email: {userDetails.email}</p>
              <p className="text-black-400">Phone: {userDetails.phone}</p>
              <p className="text-black-400">
                Gender: {userDetails.gender || "Not specified"}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-2 bg-blue-500 text-white-500 px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
        <h3 className="text-xl font-semibold mt-6">Addresses</h3>
        <div className="mt-2">
          {userDetails?.addresses?.length > 0 ? (
            userDetails?.addresses?.map((address, index) => (
              <div key={index} className="border p-4 rounded-md mt-2">
                <p>
                  {address.street_address} - {address.street_address2},{" "}
                  {address.city}, {address.state}, {address.country},
                </p>
                <p>
                  {address.country} - {address.pin_code}
                </p>
              </div>
            ))
          ) : (
            <p className="text-black-500">No addresses added.</p>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-green-600">Order History</h2>
        <div className="mt-4 space-y-4">
          {userDetails?.orders?.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-gray-100  flex justify-between items-center border-b border-black-100 "
            >
              <div>
                <p className="text-lg font-medium text-gray-800">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-gray-500">Date: {order.date}</p>
              </div>
              <div className="flex items-center">
                <p className="text-green-600 font-semibold text-lg">
                  {order.total}
                </p>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-white-500"
                      : "bg-yellow-400 text-white-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
