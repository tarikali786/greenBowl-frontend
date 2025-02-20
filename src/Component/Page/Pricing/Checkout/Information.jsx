import { memo, useEffect, useState } from "react";
import "./style.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { get, post, remove } from "../../../../servic";
import { userData } from "../../../../Helper/Helper";
import { AddressForm } from "./AddressForm";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const Information = memo(
  ({ settabValue, setCheckInfo, setPaymentIntentid }) => {
    const { access_green } = userData();
    const [userAddress, setUserAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [addAddress, setAddAddress] = useState(false);
    const price = useSelector((state) => state.salad.orderDetails.price);
    const headers = {
      Authorization: `Bearer ${access_green}`,
      "Content-Type": "application/json",
    };

console.log(price);

    const fetchUserAddressList = async () => {
      try {
        setLoading(true);
        const response = await get("/account/create-user-address/", {
          headers,
        });
        setUserAddress(response?.data || []);
        setSelectAddress(response?.data[0]);
      } catch (error) {
        console.error("Error fetching UserAddress", error);
      } finally {
        setLoading(false);
      }
    };

    const deleteUserAddress = async (uid) => {
      try {
        await remove(`/account/user-address/${uid}/`, { headers });
        toast.success("Address has been successfully removed.");
        setUserAddress(userAddress.filter((item) => item.uid !== uid));
      } catch (error) {
        toast.error("Failed to remove address.");
        console.error("Error deleting address", error);
      }
    };

    useEffect(() => {
      fetchUserAddressList();
    }, []);

    const handleSelectionAddress = (add) => {
      setSelectAddress(add);
    };

    const handleContinue = async () => {
      const data = {
        amount: price * 100,
        address: {
          line1: selectAddress?.street_address,
          city: selectAddress?.city,
          state: selectAddress?.state,
          postal_code: selectAddress?.pin_code,
          country: selectAddress?.country,
        },
        email: selectAddress?.user?.email,
        phone: selectAddress?.user?.phone,
        name: selectAddress?.user?.name,
      };

      try {
        const response = await post("/salad/create-payment-intent/", data, {
          headers,
        });
        setPaymentIntentid(response.data.payment_intent_id);
        settabValue("2");
      } catch (error) {
        toast.error("Failed to create payment intent. Please try again.");
      } finally {
        setLoading1(false);
      }
    };

    if (loading) return <p className="text-black-500 mt-8">Loading...</p>;

    return (
      <>
        <div className="w-full flex justify-end mt-2">
          {userAddress.length !== 0 && (
            <button
              onClick={() => setAddAddress(!addAddress)}
              type="button"
              className="hover:bg-red-500 px-4 py-2 rounded-xl text-white bg-green-500"
            >
              {addAddress ? "Cancel" : "Add"}
            </button>
          )}
        </div>
        {!addAddress &&
          (userAddress.length !== 0 ? (
            <div>
              {userAddress.map((item, index) => (
                <div
                  className={`mt-5 border p-4 rounded-lg cursor-pointer bg-blue-100 text-black-500 flex justify-between items-start ${
                    selectAddress?.uid === item.uid &&
                    "border-2 border-green-500 bg-green-100 "
                  }`}
                  key={index}
                  onClick={() => handleSelectionAddress(item)}
                >
                  <div className="w-[90%]">
                    <b>Address</b>: {item?.street_address1},{" "}
                    {item?.street_address2}, {item?.pin_code}, {item?.city},{" "}
                    {item?.district}, {item?.state}, {item?.country},{" "}
                    {item?.user?.phone}
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <EditIcon className="cursor-pointer hover:text-red-500" />
                    <DeleteForeverIcon
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => deleteUserAddress(item.uid)}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  className="bg-green-500 px-4 py-3 rounded-xl mt-6"
                  onClick={handleContinue}
                >
                  {loading1 ? "loading.." : " Continue"}
                </button>
              </div>
            </div>
          ) : (
            <AddressForm
              setUserAddress={setUserAddress}
              userAddress={userAddress}
              setAddAddress={setAddAddress}
            />
          ))}
        {addAddress && (
          <AddressForm
            setUserAddress={setUserAddress}
            userAddress={userAddress}
            setAddAddress={setAddAddress}
          />
        )}
      </>
    );
  }
);

Information.displayName = "Information";
