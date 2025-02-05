import Logo from "../../assets/Logo/Logo.png";
import AccountCircleIcon from "../../assets/icon/user.png";
import ShoppingCartIcon from "../../assets/icon/cart.png";
import Recipe from "../../assets/icon/icons8-meal-100.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useSaladContext } from "../SaladContextApi/SaladContext";
import { Search } from "./Search";
import { userData } from "../../Helper/Helper";
import { useState } from "react";
export const Navbar = () => {
  const { state } = useSaladContext();
  const { name, access_green } = userData();
  const [profileShow, setProfileShow] = useState(false);

  const handleLagout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="bg-black-200 w-full flex justify-between items-center px-4 md:px-14 lg:px-34 xl:px-44  sticky left-0 top-0 gap-4 z-50">
      <Link to="/" className="md:w-44 w-28 h-20">
        <img src={Logo} alt="" />
      </Link>
      <Search />
      <div className="flex items-center gap-4 md:gap-8">
        {access_green ? (
          <div
            onClick={() => setProfileShow(!profileShow)}
            className="flex items-center gap-1 md:gap-2 text-white-500 cursor-pointer relative"
          >
            <div className="size-6 md:size-8 hidden md:block">
              <img src={AccountCircleIcon} alt="" />
            </div>
            <span>{name.split(" ")[0]}</span>
            <KeyboardArrowDownIcon className=" -ml-[10px] mt-[1px]" />
            {profileShow && (
              <div className="absolute top-10 min-w-[100px]   shadow-lg w-full bg-white-500 rounded-xl text-black-400 flex flex-col overflow-hidden ">
                <Link to="/profile" className="px-3 py-1 hover:bg-green-100 ">
                  Profile
                </Link>
                <Link className="px-3 py-1 hover:bg-green-100 md:hidden block">
                  Recipe
                </Link>
                <Link className="px-3 py-1 hover:bg-green-100 ">Order</Link>
                <Link
                  className="px-3 py-1 hover:bg-green-100 pb-2"
                  onClick={handleLagout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-white-500">
            Sign in{" "}
          </Link>
        )}
        <Link
          to="/cart"
          className="flex items-center gap-1 md:gap-2 text-white-500 cursor-pointer"
        >
          <div className="size-6 md:size-8 relative">
            <img src={ShoppingCartIcon} alt="" />
            <span className="absolute top-[-8px] right-[2px] size-5 text-sm bg-green-500 text-white-500 rounded-full  flex items-center justify-center">
              {state.cart.length}
            </span>
          </div>
          <span className="hidden md:block">Cart</span>
        </Link>
        <Link
          to={"/recipe-list"}
          className="md:flex hidden items-center gap-1 md:gap-2 text-white-500 cursor-pointer"
        >
          <span>Recipe</span>
          {/* <KeyboardArrowDownIcon /> */}
        </Link>
      </div>
    </div>
  );
};
