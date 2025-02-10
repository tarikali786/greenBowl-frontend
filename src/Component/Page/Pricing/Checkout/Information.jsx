import { memo, useEffect, useState } from "react";
import "./style.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useSaladContext } from "../../../SaladContextApi";
import { get, remove } from "../../../../servic";
import { userData } from "../../../../Helper/Helper";
import { AddressForm } from "./AddressForm";
import { toast } from "react-toastify";

export const Information = memo(
  ({ settabValue, setCheckInfo, setPaymentIntentid }) => {
    const { access_green } = userData();
    const [userAddress, setUserAddress] = useState([]);
    const { price } = useSaladContext();
    const [addAddress, setAddAddress] = useState(false);

    const headers = {
      Authorization: `Bearer ${access_green}`,
      "Content-Type": "application/json",
    };

    const fetchUserAddressList = async () => {
      try {
        const response = await get("/create-user-address/", { headers });
        setUserAddress(response?.data);
      } catch (error) {
        console.error("Error fetching UserAddress", error);
      }
    };

    const DeleteuserAddress = async (uid) => {
      const res = await remove(`/user-address/${uid}/`, { headers });
      toast.success("Address has been successfully removed. ");
      const filtereddata = userAddress.filter((item) => item.uid !== uid);
      setUserAddress(filtereddata);
    };

    const EdituserAddress = async (uid) => {
      const res = await remove(`/user-address/${uid}/`, { headers });
    };

    useEffect(() => {
      fetchUserAddressList();
    }, []);

    return (
      <>
        <div className="w-full flex  justify-end mt-2">
          {userAddress.length !== 0 && (
            <button
              onClick={() => setAddAddress(!addAddress)}
              type="submit"
              className=" hover:bg-red-500 px-4 py-2 rounded-xl  text-white-500  text-right bg-green-500
             "
            >
              {addAddress ? "Cancel" : "Add"}
            </button>
          )}
        </div>
        {!addAddress &&
          (userAddress.length !== 0 ? (
            userAddress.map((item, index) => (
              <div
                className="mt-5 border p-4 rounded-lg bg-blue-100 text-black-500 flex justify-between items-start"
                key={index}
              >
                <div className="w-[90%]">
                  <b>Address</b>: {item?.street_address1},{" "}
                  {item?.street_address2}, {item?.pin_code}, {item?.city},{" "}
                  {item?.district}, {item?.state}, {item?.country},{" "}
                  {item?.user?.phone}
                </div>
                <div className="flex  justify-center items-center gap-2">
                  <EditIcon className=" cursor-pointer hover:text-red-500" />
                  <DeleteForeverIcon
                    className=" cursor-pointer hover:text-red-500"
                    onClick={() => DeleteuserAddress(item.uid)}
                  />
                </div>
              </div>
            ))
          ) : (
            <AddressForm
              setUserAddress={setUserAddress}
              userAddress={userAddress}
            />
          ))}

        {addAddress && <AddressForm />}
      </>
    );
  }
);

Information.displayName = "Information";
