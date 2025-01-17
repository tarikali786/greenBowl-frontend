import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Cart, Home, HomeLayout, PriceCart, Recipe } from "./Component";
// import Checkout from "./Component/Page/Checkout";
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
          {/* <Route path="order" element={<Checkout />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
