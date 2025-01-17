import React from "react";
import CloseIcon from "@mui/icons-material/Close";
export const Status = ({ status, message, onClick }) => {
  return (
    <>
      {status == "success" && (
        <div
          onClick={onClick}
          className=" fixed z-50 bg-[#53bc86] flex  justify-between items-center gap-4 top-[10vh] lg:top-[15vh]  right-6 px-6 py-3 rounded-lg max-w-1/2  lg:min-w-[20%]  "
        >
          <p>{message}</p>
          <CloseIcon className=" cursor-pointer" />
        </div>
      )}
      {status === "fail" && (
        <div
          onClick={onClick}
          className=" fixed z-50 bg-[#d45757] flex  justify-between items-center gap-4 top-[10vh] lg:top-[15vh]  right-6 px-6 py-3 rounded-lg max-w-1/2  lg:min-w-[20%]  "
        >
          <p>{message}</p>
          <CloseIcon className=" cursor-pointer" />
        </div>
      )}
    </>
  );
};
