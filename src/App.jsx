import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Cart, Home, HomeLayout, More, PriceCart, Recipe } from "./Component";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="recipe-list" element={<Recipe />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PriceCart />} />
          <Route path="recepi/:salad" element={<More />} />
        </Route>
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
