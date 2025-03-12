import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Cart,
  EditRecipe,
  ExploreDetail,
  Home,
  HomeLayout,
  More,
  MoreExploreSalad,
  MorePopuralSalad,
  Order,
  OrderDetails,
  PriceCart,
  ProfileLayout,
  PuporalDetail,
  Recipe,
  SearcMoreDetails,
} from "./Component";
import { ToastContainer } from "react-toastify";
import { GoogleNumber, Login, Register, VerifyNumber } from "./auth";
import { Profile } from "./Component/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="recipe-list" element={<Recipe />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="checkout" element={<PriceCart />} />
          <Route path="recepi/:salad" element={<More />} />
          <Route path="popuralSalad" element={<MorePopuralSalad />} />
          <Route path="popuralSalad/:id" element={<PuporalDetail />} />
          <Route path="searchData/:id" element={<SearcMoreDetails />} />

          <Route path="exploreSalad" element={<MoreExploreSalad />} />
          <Route path="exploreSalad/:id" element={<ExploreDetail />} />
          <Route path="edit-recipe/:id" element={<EditRecipe />} />
        </Route>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyNumber />} />
        <Route path="/number" element={<GoogleNumber />} />
        <Route path="/error" element={<p>Not Found</p>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
