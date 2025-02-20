import React, { useEffect } from "react";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import "./index.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export const OrderDetails = () => {
  const steps = ["Order Placed", "Preparing ", "Out for Delivery", "Delivered"];
  const currentStatus = "Out for Delivery";
  const { id } = useParams();
  const [activeStep, setActiveStep] = React.useState(1);
  const OrderDetails = useSelector(
    (state) => state?.salad?.OrderItem.filter((item) => item.id == id)[0]
  );

  useEffect(() => {
    if (currentStatus === "Order Placed") {
      setActiveStep(0);
    }
    if (currentStatus === "Preparing") {
      setActiveStep(1);
    }
    if (currentStatus === "Out for Delivery") {
      setActiveStep(2);
    }
    if (currentStatus === "Delivered") {
      setActiveStep(3);
    }
  }, []);
  return (
    <div className="px-4 md:px-14 lg:px-34 xl:px-44 py-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Order Details</h1>
      </div>
      <p className=" mt-2 text-black-600">
        <b>Order ID</b>: {OrderDetails?.id}
      </p>
      <p className=" mt-2 text-black-600">
        <b>Recipe Name</b>: {OrderDetails?.recipeName || OrderDetails?.title}
      </p>
      <p className=" mt-2 text-black-600">
        <b>Order Date & Time</b>: February 19, 2025, 12:45 PM
      </p>
      <div className=" my-6 text-black-600 flex flex-wrap  gap-4">
        <p className="font-semibold mt-2">Order Status:</p>
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 mb-4 items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full relative ${
                index === 1 && "CenterCard"
              }  
              ${index === 2 && "rightCard"} 
              ${
                index <= activeStep
                  ? "bg-green-500 text-white-500"
                  : "bg-red-500 text-white-500"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">List of Ingredients </h2>

        <div className="grid lg:grid-cols-3 xl:grid-cols-4 mm:grid-cols-2 gap-6">
          {OrderDetails?.ingredients &&
            OrderDetails?.ingredients?.map((item) => (
              <div className="mt-8" key={item.id}>
                <div className={`rounded-lg shadow-lg p-4`}>
                  <div className="w-full h-[22vh] md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden">
                    <img
                      src={item.img}
                      alt=""
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between my-2">
                    <p className="text-[18px] font-semibold text-black-600 mt-1">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <ScaleRoundedIcon className="text-green-600" />
                      <div className=" rounded-md flex items-center overflow-hidden">
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          className="outline-none px-1 pl-2"
                        >
                          {item.weight}g
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[16px] font-semibold text-black-600 flex items-center justify-between gap-1 my-2">
                    <p>
                      <WhatshotRoundedIcon className="text-green-600" />{" "}
                      {item?.calories} kcal per 100g
                    </p>
                  </div>
                  <p className="text-sm text-black-200 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between mt-2 items-center">
                    <p>
                      <CurrencyRupeeRoundedIcon className="text-green-600" />{" "}
                      {item?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 mm:grid-cols-2 gap-6">
          {Object.values(OrderDetails).map((category) =>
            Object.entries(category).map(([type, items]) =>
              Array.isArray(items)
                ? items.map((item) => (
                    <div className="mt-8" key={item.id}>
                      <div className="rounded-lg shadow-lg p-4">
                        <div className="w-full h-[22vh] md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between my-2">
                          <p className="text-[18px] font-semibold text-black-600 mt-1">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <ScaleRoundedIcon className="text-green-600" />
                            <div className="rounded-md flex items-center overflow-hidden">
                              <p
                                contentEditable
                                suppressContentEditableWarning
                                className="outline-none px-1 pl-2"
                              >
                                {item.weight}g
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-[16px] font-semibold text-black-600 flex items-center justify-between gap-1 my-2">
                          <p>
                            <WhatshotRoundedIcon className="text-green-600" />{" "}
                            {item.calories} kcal per 100g
                          </p>
                        </div>
                        <p className="text-sm text-black-200 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex justify-between mt-2 items-center">
                          <p>
                            <CurrencyRupeeRoundedIcon className="text-green-600" />{" "}
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : null
            )
          )}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Delivery Details </h2>
        <p className=" mt-2 text-black-600">
          <b>Delivery Address</b>: John Doe, 123 Green Street, City, PIN - XXXXX
        </p>
        <p className=" mt-2 text-black-600">
          <b>Delivery Time Estimate</b>: Approx. 30-40 mins
        </p>
        <p className=" mt-2 text-black-600">
          <b>Delivery Mode</b>: Home Delivery / Pickup
        </p>
        <p className=" mt-2 text-black-600">
          <b>Delivery Partner</b>: Assigned Rider Name
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Payment Information</h2>
        <p className=" mt-2 text-black-600">
          <b>Payment Method</b>: Need help? Chat with us!
        </p>{" "}
        <p className=" mt-2 text-black-600">
          <b>Transaction ID</b>: TXN12345678
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Support & Actions </h2>
        <p className=" mt-2 text-black-600">
          <b>Contact Support</b>: Need help? Chat with us!
        </p>
        <button className="bg-red-500 mt-2 text-white-500 p-2 rounded-xl">
          Cancel Order
        </button>
      </div>
    </div>
  );
};
