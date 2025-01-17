import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../Common";
import { SaladList } from "../CustomRecipe/SaladList";

export const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <SaladList />
      <Outlet />
      <Footer />
    </>
  );
};
