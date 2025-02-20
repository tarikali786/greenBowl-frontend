import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../Common";
import { Sidebar } from "../Profile";

export const ProfileLayout = () => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Outlet />
      <Footer />
    </>
  );
};
