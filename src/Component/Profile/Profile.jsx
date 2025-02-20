import React from "react";
import { Avatar } from "@mui/material";
// import { Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
export const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Green Street, City, PIN - 560001",
    orders: [
      {
        id: "ORD12345",
        date: "Feb 18, 2025",
        total: "₹499",
        status: "Delivered",
      },
      {
        id: "ORD67890",
        date: "Feb 12, 2025",
        total: "₹299",
        status: "Out for Delivery",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      {/* User Info */}
      <div className="flex items-center space-x-6">
        <Avatar
          alt={user.name}
          src="https://i.pravatar.cc/100"
          sx={{ width: 80, height: 80 }}
        />
        <div>
          <h1 className="text-2xl font-bold text-green-700">{user.name}</h1>
          <p className="text-gray-600 flex items-center">
            {/* <Mail className="w-4 h-4 mr-2 text-green-600" /> */}
            {user.email}
          </p>
          <p className="text-gray-600 flex items-center">
            {/* <Phone className="w-4 h-4 mr-2 text-green-600" /> */}
            {user.phone}
          </p>
          <p className="text-gray-600 flex items-center">
            {/* <MapPin className="w-4 h-4 mr-2 text-green-600" /> */}
            {user.address}
          </p>
        </div>
      </div>

      {/* Order History */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-green-700">Order History</h2>
        <div className="mt-4 space-y-4">
          {user.orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-gray-500">Date: {order.date}</p>
              </div>
              <div className="flex items-center">
                <p className="text-green-700 font-semibold text-lg">
                  {order.total}
                </p>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-white"
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
