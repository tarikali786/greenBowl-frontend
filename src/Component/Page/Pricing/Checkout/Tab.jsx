import { memo } from "react";

export const Tab = memo(({ tabvalue, settabValue, checkInfo }) => {
  const handleTabChange = (newValue) => {
    settabValue(newValue);
  };

  return (
    <div className=" flex  bg-red-500 w-full justify-center  items-center ">
      <div
        onClick={() => handleTabChange("1")}
        className={`relative w-1/2 text-white-500 gap-2 hover:text-white-500  flex justify-center items-center   p-3  cursor-pointer ${
          tabvalue === "1"
            ? "bg-blue-500  hover:bg-red-500 text-white-500"
            : "hover:bg-red-500 "
        }`}
      >
        <p className=" ">1 Imformation</p>
        {tabvalue === "1" && (
          <div className=" absolute   top-4 w-0 h-0 border-white-500 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-500 my-8" />
        )}
      </div>
      <div
        onClick={checkInfo ? () => handleTabChange("2") : null}
        className={`relative w-1/2 text-white-500  gap-2 ${
          checkInfo ? "hover:text-white-500 " : "cursor-not-allowed"
        }  flex justify-center items-center  p-3  cursor-pointer ${
          tabvalue === "2"
            ? "bg-blue-500  hover:bg-red-500 text-white-500"
            : checkInfo && "hover:bg-red-500 "
        }`}
      >
        <p>2 Payment</p>
        {tabvalue === "2" && (
          <div className=" absolute  top-4 w-0 h-0 border-white-500 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-500 my-8" />
        )}
      </div>
    </div>
  );
});

Tab.displayName = "Tab";
