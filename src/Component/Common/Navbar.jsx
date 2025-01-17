import Logo from "../../assets/Logo/Logo.png";
import AccountCircleIcon from "../../assets/icon/user.png";
import ShoppingCartIcon from "../../assets/icon/cart.png";
import Recipe from "../../assets/icon/icons8-meal-100.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSaladContext } from "../SaladContextApi/SaladContext";
export const Navbar = () => {
  const { state } = useSaladContext();
  return (
    <div className="bg-black-200 w-full flex justify-between items-center px-4 md:px-14 lg:px-34 xl:px-44  sticky left-0 top-0 gap-4 z-50">
      <Link to="/" className="w-44 h-20">
        <img src={Logo} alt="" />
      </Link>
      <div className="w-[40%]  px-2 py-3 bg-white-500 md:flex items-center rounded-lg  hidden ">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search your favorite Salads and More"
          className="outline-none border-none w-full bg-white-500 px-2"
        />
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-1 md:gap-2 text-white-500 cursor-pointer">
          <div className="size-6 md:size-8">
            <img src={AccountCircleIcon} alt="" />
          </div>
          <span>User</span>
          <KeyboardArrowDownIcon />
        </div>
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
          <span>Cart</span>
        </Link>
        <Link
          to={"/recipe-list"}
          className="md:flex hidden items-center gap-1 md:gap-2 text-white-500 cursor-pointer"
        >
          <div className="size-6 md:size-8 overflow-hidden bg-white-500 rounded-full">
            <img src={Recipe} alt="" />
          </div>
          <span>Recipe</span>
          {/* <KeyboardArrowDownIcon /> */}
        </Link>
      </div>
    </div>
  );
};
