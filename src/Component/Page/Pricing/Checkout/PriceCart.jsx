import { useState } from "react";
import { Information } from "./Information";
import { Payment } from "./Payment";
import { Tab } from "./Tab";
import { useSaladContext } from "../../../SaladContextApi/SaladContext";

export const PriceCart = () => {
  const [tabvalue, settabValue] = useState("1");
  const [paymentIntentId, setPaymentIntentid] = useState("");

  const [checkInfo, setCheckInfo] = useState(false);

  return (
    <div className=" md:px-10 lg:px-12 xl:px-44 px-6 w-full pb-10   text-white-500 py-10">
      <div className="lg:w-[60%] m-auto">
        <Tab
          tabvalue={tabvalue}
          settabValue={settabValue}
          checkInfo={checkInfo}
        />
        {tabvalue === "1" && (
          <Information
            settabValue={settabValue}
            setCheckInfo={setCheckInfo}
            checkInfo={checkInfo}
            setPaymentIntentid={setPaymentIntentid}
          />
        )}
        {tabvalue === "2" && <Payment paymentIntentId={paymentIntentId} />}
      </div>
    </div>
  );
};
